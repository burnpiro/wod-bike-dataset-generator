import os
from os import listdir
from os.path import join, isfile
from tqdm import tqdm
import pandas as pd
import json


COLUMNS_RENAME_DICT = {"node": "o", "degree": "k", "in_degree": "ik", "out_degree": "ok", "pagerank": "p"}


def convert_csv_to_json(input_path, output_path):
    df = pd.read_csv(input_path, parse_dates=True)

    df = df[["interval_start", "node", "degree", "in_degree", "out_degree", "pagerank"]]
    df['interval_start'] = pd.to_datetime(df['interval_start'])
    df["day"] = df["interval_start"].dt.day
    df["minute_in_day"] = df["interval_start"].dt.hour * 60 + df["interval_start"].dt.minute
    days_in_month = df["interval_start"].dt.daysinmonth.max()
    df = df[["day", "minute_in_day", "node", "degree", "in_degree", "out_degree", "pagerank"]]

    df = df.rename(columns=COLUMNS_RENAME_DICT)

    month_dict = {}

    for day in range(1, days_in_month + 1):
        dict_for_current_day = (df[df.day == day])[["minute_in_day", "o", "k", "ik", "ok", "p"]].groupby(
            'minute_in_day').apply(lambda g: g[["o", "k", "ik", "ok", "p"]].to_dict(orient='records')).to_dict()

        month_dict[day] = dict_for_current_day

    with open(output_path, 'w') as fp:
        json.dump(month_dict, fp)


if __name__ == '__main__':
    INPUT_FILES_DIR = join(os.path.dirname(os.path.realpath(__file__)), "metrics")

    OUTPUT_FILES_DIR = join(os.path.dirname(os.path.realpath(__file__)), "metrics_json")

    csv_files = [f for f in listdir(INPUT_FILES_DIR) if isfile(join(INPUT_FILES_DIR, f))]

    if not os.path.exists(OUTPUT_FILES_DIR):
        os.makedirs(OUTPUT_FILES_DIR)

    for f in tqdm(csv_files):
        input_path = join(INPUT_FILES_DIR, f)
        output_path = join(OUTPUT_FILES_DIR, f.replace(".csv", ".json"))

        convert_csv_to_json(input_path, output_path)
