import os
import pandas as pd

pd.options.mode.chained_assignment = None

from os.path import isfile, join
from os import listdir
from tqdm import tqdm
import glob
import datetime
import networkx as nx

def generate_metrics_from_a_single_csv(input_path, output_path, output_path_bikes_usage, bikes_per_month):
    df_names = pd.read_csv('./networks/nodes.csv', usecols=['value', 'name'])
    df = pd.read_csv('./networks/nodes_locations.csv', usecols=['name', 'lng', 'lat'])
    df_edges = pd.read_csv(input_path, usecols=['interval_start', 'interval_end', 'number_of_trips', 'rental_place',
                                                  'return_place'])
    dict_names_temp = df_names['name'].to_dict()
    dict_names = {}

#    for value, name in dict_names_temp.items():
#       dict_names[name] = value
#    df_edges["rental_place"].replace(dict_names, inplace=True)
#    df_edges["return_place"].replace(dict_names, inplace=True)

    df_edges['interval_start'] = pd.to_datetime(df_edges['interval_start'])
    df_edges['interval_end'] = pd.to_datetime(df_edges['interval_end'])

    start = df_edges.interval_start.min()
    start = start.replace(hour=0, minute=0, second=0)

    end = df_edges.interval_end.max()
    end = end.replace(hour=0, minute=0, second=0)

    ranges = pd.date_range(start, end, freq='15T')

    bikes_usage, metrics = count_metrics(df, df_edges, ranges, end, bikes_per_month)

    print("First transform conducted")

    metrics.to_csv(output_path, index=False)

    bikes_usage.to_csv(output_path_bikes_usage, index=False)


def count_metrics(df, df_edges, ranges, end, bikes_per_month):
    bikes_usage_df = pd.DataFrame(
        columns=['interval_start', 'interval_end', 'bikes_in_use', 'bikes_total', 'bikes_percentage'])
    metrics_df = pd.DataFrame(
        columns=['node', 'degree', 'in_degree', 'out_degree', 'pagerank', 'interval_start', 'interval_end'])
    i = 0
    for interval in ranges:

        interval_end = interval + datetime.timedelta(minutes=15)

        if interval_end > end:
            break

        interval_edges = pd.DataFrame(df_edges[df_edges["interval_start"] == interval])
        G = nx.DiGraph()
        for index, node in df.iterrows():
            G.add_node(index, name=node.name, lat=node.lat, lng=node.lng)
        for index, edge in interval_edges.iterrows():
            G.add_edge(edge.rental_place, edge.return_place, weight=edge.number_of_trips)
        nodes_degrees = G.degree(weight='weight')
        nodes_in_degrees = G.in_degree(weight='weight')
        nodes_out_degrees = G.out_degree(weight='weight')

        nodes_pageranks = nx.pagerank(G, weight='weight')
        nodes_info = [dict(nodes_degrees).values(), dict(nodes_in_degrees).values(), dict(nodes_out_degrees).values(),
                      nodes_pageranks.values()]
        metrics_interval_df = pd.DataFrame({'node': list(G.nodes),
                                            'degree': list(dict(nodes_degrees).values()),
                                            'in_degree': list(dict(nodes_in_degrees).values()),
                                            'out_degree': list(dict(nodes_out_degrees).values()),
                                            'pagerank': list(nodes_pageranks.values())},
                                           )

        metrics_interval_df['interval_start'] = interval
        metrics_interval_df['interval_end'] = interval_end
        pd.set_option('display.max_rows', metrics_interval_df.shape[0] + 1)

        bikes_in_use = sum(metrics_interval_df.in_degree)
        bikes_total = bikes_per_month[interval.month]
        bikes_percentage = bikes_in_use / bikes_total
        bikes_usage_interval_df = pd.DataFrame({'interval_start': interval,
                                                'interval_end': interval_end,
                                                'bikes_in_use': bikes_in_use,
                                                'bikes_total': bikes_total,
                                                'bikes_percentage': bikes_percentage}, index=[i])
        i += 1
        bikes_usage_df = bikes_usage_df.append(bikes_usage_interval_df)
        metrics_interval_df = metrics_interval_df[metrics_interval_df['degree'] > 0]
        metrics_df = metrics_df.append(metrics_interval_df)

    return bikes_usage_df, metrics_df


if __name__ == '__main__':
    INPUT_FILES_DIR = join(os.path.dirname(os.path.realpath(__file__)), "groupedby_intervals")

    OUTPUT_FILES_DIR_METRICS = join(os.path.dirname(os.path.realpath(__file__)), "metrics")
    OUTPUT_FILES_DIR_BIKES_USAGE = join(os.path.dirname(os.path.realpath(__file__)), "bikes_usage")

    csv_files = [f for f in listdir(INPUT_FILES_DIR) if isfile(join(INPUT_FILES_DIR, f))]

    if not os.path.exists(OUTPUT_FILES_DIR_METRICS):
        os.makedirs(OUTPUT_FILES_DIR_METRICS)
    if not os.path.exists(OUTPUT_FILES_DIR_BIKES_USAGE):
        os.makedirs(OUTPUT_FILES_DIR_BIKES_USAGE)
    paths = [
        r'./data',
    ]
    all_bikes = []
    bikes_per_month = {}
    for path in paths:
        all_files = sorted(glob.glob(path + "/*.csv"))
        month = 3
        for idx, filename in enumerate(all_files):
            data = pd.read_csv(filename)
            unique_bikes = data.bike_number.unique()
            bikes_per_month[month] = unique_bikes.size
            all_bikes = [*all_bikes, *unique_bikes]
            month += 1

    for f in tqdm(csv_files):
        input_path = join(INPUT_FILES_DIR, f)
        output_path_metrics = join(OUTPUT_FILES_DIR_METRICS, f.replace("groupedby_interval", "metrics"))
        output_path_bikes_usage = join(OUTPUT_FILES_DIR_BIKES_USAGE, f.replace("groupedby_interval", "bieks_usage"))

        generate_metrics_from_a_single_csv(input_path, output_path_metrics, output_path_bikes_usage, bikes_per_month)
