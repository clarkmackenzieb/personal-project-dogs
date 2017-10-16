SELECT dog_picture 
    FROM dogs 
    WHERE uploaded_by = $1;