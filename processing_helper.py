import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from datetime import datetime

COLUMNS = [
    'uid',
    'rental_place',
    'return_place'
]


def extract_data(train_file_path, columns=COLUMNS):
    # Read csv file and return
    all_data = pd.read_csv(train_file_path, usecols=columns)
    all_data = all_data[all_data['rental_place'] != 'Poza stacją']
    all_data = all_data[all_data['return_place'] != 'Poza stacją']
    all_data = all_data[all_data['return_place'] != all_data['rental_place']]
    stations = all_data['rental_place'].unique()
    all_data = all_data.dropna()

    for feature_name in ['rental_place', 'return_place']:
        mapping_dict = {stations[i]: i for i in range(0, len(stations))}
        all_data[feature_name] = all_data[feature_name].map(mapping_dict)

    return all_data

#
# data = extract_data('data/historia_przejazdow_2019-03.csv')
#
# print(data.head())
# print()
# print(len(data[data['return_place'] == 1][data['rental_place'] == 0]))
# print()
# grouped_data = data.groupby(['rental_place', 'return_place']).size().reset_index()
# grouped_data = grouped_data.rename(columns={
#     'rental_place': 'Source',
#     'return_place': 'Target',
#     0: 'Weight'
# })
# grouped_data['Type'] = 'Directed'
# print(grouped_data)
# grouped_data.to_csv('out.csv', index=False)
