import os
import pandas as pd
from os.path import isfile, join
from os import listdir
from tqdm import tqdm
import datetime


def generate_intervals_from_a_single_csv(input_path, output_path):
    df = pd.read_csv(input_path, index_col=0, parse_dates=True)

    df['start_time'] = pd.to_datetime(df['start_time'])
    df['end_time'] = pd.to_datetime(df['end_time'])

    start = df.start_time.min()
    start = start.replace(hour=0, minute=0, second=0)

    end = df.end_time.max()
    end = end.replace(hour=0, minute=0, second=0) + datetime.timedelta(days=1)

    ranges = pd.date_range(start, end, freq='15T')

    all_trips_in_all_intervals_df = pd.DataFrame(
        columns=["interval_start", "interval_end", "rental_place", "return_place"])

    for i in range(len(ranges) - 1):
        interval_start, interval_end = ranges[i], ranges[i + 1]

        interval_df = df[(df.start_time <= interval_end) & (df.end_time >= interval_start)]

        interval_df["interval_start"] = interval_start
        interval_df["interval_end"] = interval_end

        all_trips_in_all_intervals_df = all_trips_in_all_intervals_df.append(
            interval_df[["interval_start", "interval_end", "rental_place", "return_place"]])

    intervals_grouped_df = pd.DataFrame(
        columns=["interval_start", "interval_end", "number_of_trips", "rental_place", "return_place"])

    print("First transform conducted")

    for i in range(len(ranges) - 1):
        interval_start, interval_end = ranges[i], ranges[i + 1]

        interval_group_df = (
            all_trips_in_all_intervals_df[all_trips_in_all_intervals_df["interval_start"] == interval_start]).groupby(
            ['rental_place', 'return_place'], as_index=False).count()

        interval_group_df = interval_group_df.rename(columns={"interval_start": "number_of_trips"})

        interval_group_df["interval_start"] = interval_start
        interval_group_df["interval_end"] = interval_end

        intervals_grouped_df = intervals_grouped_df.append(interval_group_df)

    intervals_grouped_df.to_csv(join(output_path), index=False)


if __name__ == '__main__':
    INPUT_FILES_DIR = join(os.path.dirname(os.path.realpath(__file__)), "data_preprocessed")

    OUTPUT_FILES_DIR = join(os.path.dirname(os.path.realpath(__file__)), "groupedby_intervals")

    csv_files = [f for f in listdir(INPUT_FILES_DIR) if isfile(join(INPUT_FILES_DIR, f))]
    csv_files.remove("nodes.csv")

    if not os.path.exists(OUTPUT_FILES_DIR):
        os.makedirs(OUTPUT_FILES_DIR)

    for f in tqdm(csv_files):
        input_path = join(INPUT_FILES_DIR, f)
        output_path = join(OUTPUT_FILES_DIR, f.replace("preprocessed", "groupedby_interval"))

        generate_intervals_from_a_single_csv(input_path, output_path)
