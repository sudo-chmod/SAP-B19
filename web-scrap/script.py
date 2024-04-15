import pymongo
import certifi
import config
import pandas as pd
import scrap

def insert_data_and_update_ranks(df, degree_program):
    raw_count = df.shape[0]
    index_arr = []
    gpa_arr = []

    for i in range(raw_count):
        index = str(df.at[i, 'Index']).strip()
        nic = str(df.at[i, 'NIC']).strip()
        name, gpa, tot_credit, tot_creditXgrade, result = scrap.get_data(index, nic)
        index_arr.append(index)
        gpa_arr.append(gpa)
        print(f"{i + 1} | {index} | {name} | {gpa}")
        data = {
            "name": name,
            "index": index,
            "nic": nic,
            "degreeProgram": degree_program,
            "rank": 0,
            "gpa": gpa,
            "totalCredit": tot_credit,
            "totalCreditXGrade": tot_creditXgrade,
            "result": result
        }
        collection.insert_one(data)

    print(f"All {degree_program} data inserted")

    df_rank = pd.DataFrame({"Index": index_arr, "GPA": gpa_arr})
    df_rank["Rank"] = df_rank["GPA"].rank(ascending=False).astype(int)
    for i in range(raw_count):
        index = df_rank.at[i, 'Index']
        rank = int(df_rank.at[i, 'Rank'])
        collection.update_one({"index": index}, {"$set": {"rank": rank}})
        print(f"{i + 1} | {index} | Rank: {rank}")

    print(f"All {degree_program} ranks updated")


client = pymongo.MongoClient(config.MONGODB_URI, tlsCAFile=certifi.where())
db = client[config.DATABASE_NAME]
print("Connection established")

if config.DEBUG:
    print("Debug mode is on")
    collection = db[config.TEST_COLLECTION_NAME]
    df = pd.read_excel(config.TEST_DATA_FILE)
    insert_data_and_update_ranks(df, "Test")
else:
    collection = db[config.COLLECTION_NAME]
    df_cs = pd.read_excel(config.CS_DATA_FILE)
    insert_data_and_update_ranks(df_cs, "Computer Science")
    df_is = pd.read_excel(config.IS_DATA_FILE)
    insert_data_and_update_ranks(df_is, "Information Systems")

client.close()
print("Connection closed")
