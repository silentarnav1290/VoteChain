import hashlib
import time
import tkinter as tk
from tkinter import ttk
from common import *

class NFT:  
    def __init__(self, id, owner):
        self.id = id
        self.owner = owner

def create_nft():
    global nft_id
    nft_id += 1
    nft = NFT(nft_id, Supervisor_Wallet)
    blockchain.add_block("Created NFT #" + str(nft_id))
    Supervisor_Wallet.add_nft(nft)
    print("NFT Succefully created")


blockchain = Blockchain()

Supervisor_Wallet = Wallet("Supervisor")

nft_id = 0

root = tk.Tk()
root.title("Supervisor Window")

create_nft_button = ttk.Button(root, text="Create NFT", command=create_nft)
create_nft_button.grid(row=0, column=0, padx=(0, 10), pady=(10, 0))

root.mainloop()
