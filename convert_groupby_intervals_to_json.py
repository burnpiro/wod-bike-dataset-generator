import os
from os import listdir
from os.path import join, isfile
from tqdm import tqdm
import pandas as pd

COLUMNS_RENAME_DICT = {"interval_start": "s", "rental_place": "o", "return_place": "d", "number_of_trips": "c"}


def convert_csv_to_json(input_path, output_path):
    df = pd.read_csv(input_path, parse_dates=True)

    df = df[["interval_start", "rental_place", "return_place", "number_of_trips"]]
    df = df.rename(columns=COLUMNS_RENAME_DICT)

    df.to_json(output_path, orient="records")


if __name__ == '__main__':
    INPUT_FILES_DIR = join(os.path.dirname(os.path.realpath(__file__)), "groupedby_intervals")

    OUTPUT_FILES_DIR = join(os.path.dirname(os.path.realpath(__file__)), "groupedby_intervals_json")

    csv_files = [f for f in listdir(INPUT_FILES_DIR) if isfile(join(INPUT_FILES_DIR, f))]

    if not os.path.exists(OUTPUT_FILES_DIR):
        os.makedirs(OUTPUT_FILES_DIR)

    for f in tqdm(csv_files):
        input_path = join(INPUT_FILES_DIR, f)
        output_path = join(OUTPUT_FILES_DIR, f.replace(".csv", ".json"))

        convert_csv_to_json(input_path, output_path)
