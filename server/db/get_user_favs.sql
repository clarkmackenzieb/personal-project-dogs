SELECT *
    FROM dogs d
    WHERE dog_id IN (SELECT dogid FROM favorites WHERE userid = $1)