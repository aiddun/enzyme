#!/bin/bash
(python csv_to_json.py < grades.csv) > grades.json
# node gen_index.js