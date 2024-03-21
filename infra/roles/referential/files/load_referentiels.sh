#!/bin/bash

REFERENTIELS="criteres etapes hypotheses typeEquipement correspondanceRefEquipement impactequipements mixelecs"

for referentiel in $REFERENTIELS; do
  curl -s -XPOST http://localhost:18080/referentiel/$referentiel/csv --form file=@input_ref/$referentiel.csv
  echo ""
done
