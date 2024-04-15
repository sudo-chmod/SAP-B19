import config

def get_data(index, nic):
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    import time

    driver = webdriver.Firefox()
    driver.get(config.WEB_URL)

    driver.find_element("name","no").send_keys(index)
    driver.find_element("name","pw").send_keys(nic)
    driver.find_element(By.XPATH, '//button[@class="btn btn-primary w-100 py-2"]').click()
    time.sleep(1)

    name = driver.find_element(By.XPATH, "/html/body/div[1]/h5[1]/strong").text.split(": ")[1]
    table1_raw_count = len(driver.find_element(By.XPATH, "/html/body/div[1]/table[1]/tbody").find_elements(By.TAG_NAME,"tr"))
    table2_raw_count = len(driver.find_element(By.XPATH, "/html/body/div[1]/table[2]/tbody").find_elements(By.TAG_NAME,"tr"))

    grades = {
        'A+': 4.0,
        'A' : 4.0,
        'A-' : 3.7,
        'B+' : 3.3,
        'B' : 3.0,
        'B-' : 2.7,
        'C+' : 2.3,
        'C' : 2.0,
        'C-' : 1.7,
        'D+' : 1.3,
        'D' : 1.0,
        'E' : 0.0,
        'F' : 0.0,
        'MC' : 0.0,
        'CN' : 0.0
    }

    total_credit = 0
    total_creditXgrade = 0
    result = []

    i = 1
    while(i <= table1_raw_count):
        year = driver.find_element(By.XPATH, "/html/body/div[1]/table/tbody/tr[" + str(i) + "]/td[2]").text
        if year != "[19]" and year != "[20]":
            i += 1
            continue

        sub_credit = driver.find_element(By.XPATH, "/html/body/div[1]/table/tbody/tr[" + str(i) + "]/td[4]/span").text
        if sub_credit == '0':
            i += 1
            continue

        sub_code = driver.find_element(By.XPATH, "/html/body/div[1]/table/tbody/tr[" + str(i) + "]/td[1]").text.strip().split(" ")[0]
        sub_name = " ".join(driver.find_element(By.XPATH, "/html/body/div[1]/table/tbody/tr[" + str(i) + "]/td[1]").text.strip().split(" ")[1:])
        sub_grade = driver.find_element(By.XPATH, "/html/body/div[1]/table/tbody/tr[" + str(i) + "]/td[5]").text

        if (i != table1_raw_count):
            next_sub_code = driver.find_element(By.XPATH, "/html/body/div[1]/table/tbody/tr[" + str(i + 1) + "]/td[1]").text.strip().split(" ")[0]
        else:
            next_sub_code = None

        if sub_code != next_sub_code:
            sub_creditXgrade = round(int(sub_credit) * grades[sub_grade], 1)
            total_credit += int(sub_credit)
            total_creditXgrade += sub_creditXgrade
            result.append({
                "subCode": sub_code,
                "subName": sub_name,
                "subGrade": sub_grade,
                "subCredit": sub_credit,
                "subCreditXGrade": sub_creditXgrade
            })
            i += 1
        else:
            next_sub_grade = driver.find_element(By.XPATH, "/html/body/div[1]/table/tbody/tr[" + str(i + 1) + "]/td[5]").text
            if grades[sub_grade] > grades[next_sub_grade]:
                sub_creditXgrade = round(int(sub_credit) * grades[sub_grade], 1)
                total_credit += int(sub_credit)
                total_creditXgrade += sub_creditXgrade
                result.append({
                    "subCode": sub_code,
                    "subName": sub_name,
                    "subGrade": sub_grade,
                    "subCredit": sub_credit,
                    "subCreditXGrade": sub_creditXgrade
                })
            else:
                if grades[next_sub_grade] > 2.0 and sub_grade != 'MC':
                    next_sub_grade = 'C'
                sub_creditXgrade = round(int(sub_credit) * grades[next_sub_grade], 1)
                total_credit += int(sub_credit)
                total_creditXgrade += sub_creditXgrade
                result.append({
                    "subCode": sub_code,
                    "subName": sub_name,
                    "subGrade": next_sub_grade,
                    "subCredit": sub_credit,
                    "subCreditXGrade": sub_creditXgrade
                })
            i += 2
        
    j = 1
    while(j <= table2_raw_count):
        sub_credit = driver.find_element(By.XPATH, "/html/body/div[1]/table[2]/tbody/tr[" + str(j) + "]/td[4]/span").text
        if sub_credit == '0':
            j += 1
            continue

        sub_code = driver.find_element(By.XPATH, "/html/body/div[1]/table[2]/tbody/tr[" + str(j) + "]/td[1]").text.strip().split(" ")[0]
        sub_name = " ".join(driver.find_element(By.XPATH, "/html/body/div[1]/table[2]/tbody/tr[" + str(j) + "]/td[1]").text.strip().split(" ")[1:])
        sub_grade = driver.find_element(By.XPATH, "/html/body/div[1]/table[2]/tbody/tr[" + str(j) + "]/td[5]").text
        sub_creditXgrade = round(int(sub_credit) * grades[sub_grade], 1)
        total_credit += int(sub_credit)
        total_creditXgrade += sub_creditXgrade
        result.append({
            "subCode": sub_code,
            "subName": sub_name,
            "subGrade": sub_grade,
            "subCredit": sub_credit,
            "subCreditXGrade": sub_creditXgrade
        })
        j += 1

    driver.close()

    return name, round(total_creditXgrade / total_credit, 4), total_credit, round(total_creditXgrade, 1), result
