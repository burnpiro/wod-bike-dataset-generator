import pandas as pd
import glob

all_files = sorted(glob.glob('./networks/2019' + "*.csv"))
locations = pd.read_csv('./networks/nodes_locations.csv', usecols=['lng', 'lat'])

print(locations.iloc[0]['lng'])


def parse_x(x, column):
    column_data = locations.iloc[int(x)][column]
    return column_data


def extract_column(column):
    return lambda x: parse_x(x, column)


for idx, filename in enumerate(all_files):
    all_data = pd.read_csv(filename, usecols=['Source', 'Target', 'Weight', 'Type'])
    all_data['lng_org'] = all_data['Source'].apply(extract_column('lng'))
    all_data['lat_org'] = all_data['Source'].apply(extract_column('lat'))
    all_data['lng_dest'] = all_data['Target'].apply(extract_column('lng'))
    all_data['lat_dest'] = all_data['Target'].apply(extract_column('lat'))

    print(all_data.head())
    all_data.to_csv(filename, index=False)
