import csv
import json
import sys

# CSV to JSON
# Pipe in file
# example: python csv_to_json.py < grades.csv > grades.json

if not sys.stdin:
    print("Error: please pipe in file")


sys.stdout.write('[')


# Avoid printing a final comma by making comma printing front heavy
first = True

for row in csv.DictReader(sys.stdin):
    if first:
        first = False
    else:
        sys.stdout.write(',\n')


    json.dump(row, sys.stdout)

sys.stdout.write(']')
