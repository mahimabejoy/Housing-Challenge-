 
import re
from bs4 import BeautifulSoup
import requests
import pandas as pd
import re

positions = []
companies = []
locations = []
posted_dates = []
salaries = []
experiences = []
tasks = []
def scraping_url(url):
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        article_element = soup.find_all('a', class_ = 'resultJobItem')
        for article in article_element:
            element = article.find('span',class_ ='noctitle')
            # Extract the text from the element
            position = element.contents[0].strip() if element else ''
            linked_url = article.get("href")
            full_linked_url = "https://www.jobbank.gc.ca" + linked_url  # Construct the full URL
            linked_response = requests.get(full_linked_url)
            # Step 4: Parse the linked page
            linked_soup = BeautifulSoup(linked_response.text, "html.parser")
            linked_item = linked_soup.find('div',class_ = 'job-posting-detail-requirements')
            if linked_item:
                experience = linked_item.find('p', attrs={"property": "experienceRequirements qualification"})
                if experience:
                    experience = experience.text.strip()
                else:
                    experience = "NA"
                responsibilities = linked_item.find('div', attrs = {"property": "responsibilities"})
                if responsibilities:
                    span_tags = responsibilities.find_all('span')
                    # Extract the text inside each <span> tag
                    responsibilities = [span.get_text() for span in span_tags]
                    # Join the extracted responsibilities into a single string
                    responsibilities_text = ', '.join(responsibilities)
                    #task = linked_item.find('ul', class_='csvlist').text.strip()
                else:
                    responsibilities_text = ''.join("NA")
            else:
                experience = "NA"


            # Find all the <span> tags within the <div> element

            box = article.find('ul',class_ = 'list-unstyled')
            dates = box.find('li', class_ = 'date').text.strip()
            company = box.find('li', class_ = 'business').text.strip()
            location_box = box.find('li',class_ = 'location')
            location = location_box.contents[-1].strip() if location_box else ''
            salary = box.find('li', class_ = 'salary').text.strip()
            #Use a regular expression to remove all '\n' and '\t' occurrences
            #print(responsibilities_text)
            #print(task)
            salary = re.sub(r'[\n\t]', '', salary)
            positions.append(position)
            companies.append(company)
            locations.append(location)
            posted_dates.append(dates)
            salaries.append(salary)
            experiences.append(experience)
            tasks.append(responsibilities_text)

base_url = 'https://www.jobbank.gc.ca/jobsearch/jobsearch?searchstring=IT+jobs&locationstring='
page_num = 1

while page_num <=100:
    page_url = f'{base_url}?page={page_num}&sort=M'
    scraping_url(page_url)
    page_num +=1

data = {'position': positions,'company':companies,'location':locations,'posted date':posted_dates,'salaries':salaries,
       'Experience' : experiences,'Responsibilities' : tasks}
df = pd.DataFrame(data)
df.head(20)

df.shape

from google.colab import files
df.to_excel('Job_Data.xlsx', index=False)
files.download('Job_Data.xlsx') #to download the data

df['location'].value_counts()

dict = {
    'Mississauga (ON)': 1,
    'Etobicoke (ON)': 2,
    'Edmonton (AB)': 3,
    'Cambridge (ON)': 4

}
df['num']=df['location'].map(dict)

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import OneHotEncoder

# Assume 'df' is your DataFrame containing the dataset

# Feature engineering
# For simplicity, let's use only 'position' and 'company' columns
X = df[['position']]
y = df[['num']]


# One-hot encoding
encoder = OneHotEncoder()
X_encoded = encoder.fit_transform(X)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

# Train a random forest classifier
clf = RandomForestClassifier(random_state=42)
clf.fit(X_train, y_train)

# Make predictions
y_pred = clf.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy}")

X_test

position = input("Enter the job position: ")
input_data = pd.DataFrame({'position': [position]})

# One-hot encoding for input data
input_encoded = encoder.transform(input_data)

# Make prediction
predicted_location = clf.predict(input_encoded)[0]
print(f"Predicted location: {predicted_location}") #this is our output location

import numpy as np

def recommendation(N):

    prediction = clf.predict(N)

    return prediction[0]

N = 'office manager'
encoder = OneHotEncoder()
X_encoded = encoder.fit_transform(X)
predict = recommendation(input)

dict = {}

if predict[0] in dict:
    crop = dict[predict[0]]
    print("{} is a best crop to be cultivated ".format(crop))
else:
    print("Sorry are not able to recommend a proper crop for this environment")

import pickle
pickle.dump(clf,open('model.pkl','wb'))
