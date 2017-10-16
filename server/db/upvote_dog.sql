UPDATE dogs
    SET votes = votes + 1
    WHERE dog_id = ${dogid};

SELECT * FROM dogs;