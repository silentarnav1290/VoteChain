import hashlib
import time
import tkinter as tk
from tkinter import ttk

class Block:
    def __init__(self, index, previous_hash, timestamp, data, hash):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = timestamp
        self.data = data
        self.hash = hash

class Blockchain:
    def __init__(self):
        self.chain = [self.create_genesis_block()]
        self.difficulty = 2

    def create_genesis_block(self):
        return Block(0, "0", int(time.time()), "Genesis Block", self.calculate_hash(0, "0", int(time.time()), "Genesis Block"))

    def calculate_hash(self, index, previous_hash, timestamp, data):
        value = str(index) + str(previous_hash) + str(timestamp) + str(data)
        return hashlib.sha256(value.encode('utf-8')).hexdigest()

    def add_block(self, data):
        previous_block = self.chain[-1]
        new_block = Block(len(self.chain), previous_block.hash, int(time.time()), data, None)
        new_block.hash = self.calculate_hash(new_block.index, new_block.previous_hash, new_block.timestamp, new_block.data)
        self.chain.append(new_block)

class NFT:
    def __init__(self, id):
        self.id = id

class Wallet:
    def __init__(self, name):
        self.name = name
        self.nfts = []

    def add_nft(self, nft):
        self.nfts.append(nft)

    def count_nfts(self):
        return len(self.nfts)

def nft_append(int n, list l)"
    global nft_id
    nft = NFT(nft_id)
    i = 0;
    while(True):
        if n == l[i]:
            l[i].add_nft(nft)
            blockchain.add_block("Created NFT #" + str(nft_id))
        else:
            print("NFT NOT FOUND")

def count_nfts():
    global nft_id
    account1_nfts = wallet1.count_nfts()
    account2_nfts = wallet2.count_nfts()
    nfts_label.config(text="Account 1: " + str(account1_nfts) + " NFTs\nAccount 2: " + str(account2_nfts) + " NFTs")

blockchain = Blockchain()
wallet1 = Wallet("Account 1")
wallet2 = Wallet("Account 2")
Candidates = []
for i in range(10):
    Candidates.append(Wallet(str(i)))
nft_id = 0

root = tk.Tk()
root.title("Local Blockchain Network")

create_nft_button = ttk.Button(root, text="Create NFT", command=create_nft)
create_nft_button.grid(row=0, column=0, padx=(0, 10), pady=(10, 0))

send_nft_button = ttk.Button(root, text="Send NFT", command=send_nft)
send_nft_button.grid(row=0, column=1, padx=(0, 10), pady=(10, 0))

count_nfts_button = ttk.Button(root, text="Count NFTs", command=count_nfts)
count_nfts_button.grid(row=0, column=2, padx=(0, 10), pady=(10, 0))

nft_id_label = ttk.Label(root, text="NFT ID:")
nft_id_label.grid(row=1, column=0, padx=(0, 10), pady=(10, 0))

nft_id_entry = ttk.Entry(root, width=10)
nft_id_entry.grid(row=1, column=1, padx=(0, 10), pady=(10, 0))

nfts_label = ttk.Label(root, text="")
nfts_label.grid(row=2, column=0, columnspan=3, pady=(10, 0))

root.mainloop()
