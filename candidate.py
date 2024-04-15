from supervisor import *

def transfer_nft():
    nft_id
    nft_id_to_send = int(nft_id_entry.get())
    nft_to_send = None
    for nft in Supervisor_Wallet.nfts:
        if nft.id == nft_id_to_send:
            nft_to_send = nft
            break
    if nft_to_send is not None:
        wallet2.add_nft(nft_to_send)
        Supervisor_Wallet.nfts.remove(nft_to_send)
        supervisor.blockchain.add_block("Transferred NFT #" + str(nft_id_to_send) + " from Account 1 to Account 2")

wallet1 = Wallet("Account 1")
wallet2 = Wallet("Account 2")

root = tk.Tk()
root.title("Candidate Window")

send_nft_button = ttk.Button(root, text="Send NFT", command=transfer_nft)
send_nft_button.grid(row=0, column=1, padx=(0, 10), pady=(10, 0))

nft_id_label = ttk.Label(root, text="NFT ID:")
nft_id_label.grid(row=1, column=0, padx=(0, 10), pady=(10, 0))

nft_id_entry = ttk.Entry(root, width=10)
nft_id_entry.grid(row=1, column=1, padx=(0, 10), pady=(10, 0))

nfts_label = ttk.Label(root, text="")
nfts_label.grid(row=2, column=0, columnspan=3, pady=(10, 0))

root.mainloop()
