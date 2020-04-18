import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from datetime import datetime

COLUMNS = [
    'uid',
    'rental_place',
    'return_place'
]

nodes_to_remove = [
    '.GOTOWE DO REZERWACJI',
    'Poza stacją',
    '.RELOKACYJNA',
    '.RELOKACYJNA A1-4',
    '# Rowery skradzione Wrocław 2014',
    '#Rowery zapasowe Warszawa'
]


def trim_and_remove_slash(s):
    return s.strip().replace('/', '-').replace('"', '').replace(',', ' -')


def extract_data(train_file_path, columns=COLUMNS):
    # Read csv file and return
    all_data = pd.read_csv(train_file_path, usecols=columns)
    for place in nodes_to_remove:
        all_data = all_data[all_data['rental_place'] != place]
        all_data = all_data[all_data['return_place'] != place]
    all_data = all_data[all_data['return_place'] != all_data['rental_place']]
    all_data['rental_place'] = all_data['rental_place'].apply(trim_and_remove_slash)
    all_data['return_place'] = all_data['return_place'].apply(trim_and_remove_slash)
    stations = all_data['rental_place'].unique()
    all_data = all_data.dropna()

    return all_data, stations

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
