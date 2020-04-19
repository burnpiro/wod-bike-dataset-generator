import requests
import pandas as pd
import glob


all_data = pd.read_csv('./networks/nodes.csv', usecols=['name'])
locations = pd.read_csv('./locations.csv', usecols=['lng', 'lat'])

all_data['lng'] = locations['lng']
all_data['lat'] = locations['lat']

all_data.to_csv('test_merge.csv')