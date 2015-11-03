import sc2reader
import jsonpickle
import sys, getopt
from datetime import datetime, date
import calendar

replay = ''

myopts, args = getopt.getopt(sys.argv[1:],"f:")

for o, a in myopts:
    if o == '-f':
        replay = a
    else:
        print("Usage: %s -f replay_file_name" % sys.argv[0]) 

sc2replay = sc2reader.load_replay(replay, load_level=3)

class SC2Data(object):
    pass

sc2data = SC2Data()
sc2data.start_time = int((sc2replay.start_time - datetime(1970, 1, 1)).total_seconds())
sc2data.start_time = int((sc2replay.end_time - datetime(1970, 1, 1)).total_seconds())
sc2data.map_name = sc2replay.map_name
sc2data.num_players = len(sc2replay.players)
sc2data.player_1_detail_data = sc2replay.players[0].detail_data
sc2data.player_1_pick_race = sc2replay.players[0].pick_race
sc2data.player_1_result = sc2replay.players[0].team.result
sc2data.player_2_detail_data = sc2replay.players[1].detail_data
sc2data.player_2_pick_race = sc2replay.players[1].pick_race
sc2data.player_2_result = sc2replay.players[1].team.result

print(jsonpickle.encode(sc2data))

sys.exit("")