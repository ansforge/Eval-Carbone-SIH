#!/bin/bash

REFERENTIELS="criteres etapes hypotheses typeEquipement correspondanceRefEquipement impactequipements mixelecs"

for referentiel in $REFERENTIELS; do
  curl -s -XPOST http://localhost:18080/referentiel/$referentiel/csv --form file=@input_ref/$referentiel.csv
  echo ""
done

cat ref_correspondance_type_equipement.sql | docker exec -i postgresdb psql -U postgres postgres

docker cp input_ref/correspondanceTypeEquipement.csv postgresdb:/docker-entrypoint-initdb.d/correspondanceTypeEquipement.csv

docker exec -i postgresdb psql -U postgres postgres -c "\copy ref_correspondance_type_equipement FROM '/docker-entrypoint-initdb.d/correspondanceTypeEquipement.csv' DELIMITER ';' CSV HEADER"
