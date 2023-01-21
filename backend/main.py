from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    "localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


df = pd.read_csv('./fast_excel.csv', index_col=0)

@app.get('/')
async def main_page():
    size = str(df.size)
    return size

@app.get('/get/{idx}')
async def read_name(idx:int):
    return dict(df.iloc[idx])

@app.get('/post/{name}')
async def write_name(name:str):
    data=[name]
    df.loc[len(df)]=data
    df.to_csv('./fast_excel.csv')
    return 'Write Complete'