import pandas as pd

# read the existing CSV file
df = pd.read_csv('/tmp/l.csv')

# create Domain csv
domains_df = df[['Dominio']].drop_duplicates()
domains_df.reset_index(drop=True, inplace=True)
domains_df.index.name = 'id'
domains_df.columns = ['domainName']
domains_df.to_csv('/tmp/l1.csv')

# create Subdomain csv
subdomains_df = df[['Dominio', 'Ambito']].drop_duplicates()
subdomains_df.reset_index(drop=True, inplace=True)
subdomains_df.index.name = 'id'
subdomains_df.columns = ['domainName', 'subdomainName']
# map domainName to domainId
subdomains_df['domainId'] = subdomains_df['domainName'].map(
    domains_df.reset_index().set_index('domainName')['id'])
subdomains_df = subdomains_df[['subdomainName', 'domainId']]
subdomains_df.to_csv('/tmp/l2.csv')

# create QAPairs csv
qapairs_df = df[['Ambito', 'Pregunta', 'Respuesta']].copy()
qapairs_df.reset_index(drop=True, inplace=True)
qapairs_df.index.name = 'id'
qapairs_df.columns = ['subdomainName', 'question', 'answer']
# map subdomainName to subdomainId
qapairs_df['subdomainId'] = qapairs_df['subdomainName'].map(
    subdomains_df.reset_index().set_index('subdomainName')['id'])
qapairs_df = qapairs_df[['question', 'answer', 'subdomainId']]
qapairs_df.to_csv('/tmp/l3.csv')
