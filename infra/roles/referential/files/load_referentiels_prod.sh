#!/bin/bash

REFERENTIELS="criteres etapes hypotheses typeEquipement correspondanceRefEquipement impactequipements mixelecs"

for referentiel in $REFERENTIELS; do
  # Attention, manipulations pour que cet import fonctionne :
  # - Modifier sur le VM docker-compose.yml pour y ajouter le port 18080 au service api-rest-referentiels
  # - docker compose --env-file .env.prod up -d api-rest-referentiels
  # - Lancer l'import
  # - Retirer le port dans docker-compose.yml
  # - docker compose --env-file .env.prod up -d api-rest-referentiels
  curl -s -XPOST http://localhost:18080/referentiel/$referentiel/csv --form file=@input_ref/$referentiel.csv
  echo ""
done

. ../.env.prod

cat ./ref_correspondance_type_equipement.sql | docker exec -i postgresdb psql -U $POSTGRES_USER postgres

docker cp input_ref/correspondanceTypeEquipement.csv postgresdb:/docker-entrypoint-initdb.d/correspondanceTypeEquipement.csv

docker exec -i postgresdb psql -U $POSTGRES_USER postgres -c "\copy ref_correspondance_type_equipement FROM '/docker-entrypoint-initdb.d/correspondanceTypeEquipement.csv' DELIMITER ';' CSV HEADER"
