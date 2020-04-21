import csv
import json

csvFilePath = "Resources_sankey.csv"
jsonFilePath = "Resources.json"

data= {}

links = []
nodes = []

node_lookup = []

test = []
with open (csvFilePath) as csvFile:
    csvReader = csv.reader(csvFile, delimiter=";")
    for i, row in enumerate(csvReader):
        if(row[0], row[1]) in test:
            print(row[0], row[1])
        if(row[1], row[0]) in test:
            print(row[1], row[0])

        test.append((row[0], row[1]))

        if(i == 0):
            continue
        if(not row[0] in node_lookup):
            nodes.append({'name': row[0]})
            node_lookup.append(row[0])
        if(not row[1] in node_lookup):    
            nodes.append({'name': row[1]})
            node_lookup.append(row[1])

        source = node_lookup.index(row[0])
        target = node_lookup.index(row[1])
        print(row[0], source, row[1], target)
        value = float(row[2].replace(',', '.'))
        links.append({"source": source, "target": target, "value": value})       


    data['nodes'] = nodes
    data['links'] = links

# create new json file 
with open(jsonFilePath, 'w') as jsonFile:
    #something random
    jsonFile.write(json.dumps(data, indent=4))