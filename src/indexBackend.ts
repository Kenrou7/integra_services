import { addInfoToDatabase, connectDb, getInfoFromDatabase } from "./backend/backend";

connectDb()
addInfoToDatabase('a', 'b', 1, false, 2, 3, 'c')
getInfoFromDatabase()
