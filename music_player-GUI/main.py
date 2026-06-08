import os
import warnings
os.environ["PYGAME_HIDE_SUPPORT_PROMPT"] = "hide"
import pygame
import tkinter as tk
from tkinter import messagebox

# Music logic functions
def play_selected_songs():
    """"Gets the selected song from the listbox and plays it."""
    try:
        selected_index = song_listbox.curselection()
        if not selected_index:
            messagebox.showwarning("Warning", "Please select a song first")
            return
        
        # Get the song name from the listbox selection
        song_name = song_listbox.get(selected_index)
        file_path = os.path.join(FOLDER, song_name)

        pygame.mixer.music.load(file_path)
        pygame.mixer.music.play()
        status_label.config(text=f"Now Playing: {song_name}")
    except Exception as e:
        messagebox.showerror("Error", f"Could not play audio: {e}")

def pause_song():
    pygame.mixer.music.pause()
    status_label.config(text="Status : Paused")
    
def resume_song():
    pygame.mixer.music.unpause()
    status_label.config(text="Status : Playing")
    
def stop_song():
    pygame.mixer.music.stop()
    status_label.config(text="Status : Stopped")

# Initialize Audio & Folder
try:
    pygame.mixer.init()
except pygame.error as e:
    print("Audio initialization failed!", e)
    exit()

FOLDER = "my_songs"

# Get the list of mp3 files
if os.path.isdir(FOLDER):
    mp3_files = [file for file in os.listdir(FOLDER) if file.endswith(".mp3")]
else:
    mp3_files = []

# create GUI window
root = tk.Tk()
root.title("MP3 Player")
root.geometry("400x450")
root.config(bg="#2c3e50")

# 1. Title label
title_label = tk.Label(root, text="MY MP3 PLAYER", font=("Arial", 16, "bold"), bg="#2c3e50", fg="white")
title_label.pack(pady=10)

# 2. Song Listbox
song_listbox = tk.Listbox(root, width=45, height=12, bg="#34495e", fg="white", selectbackground="#1abc9c", font=("Arial", 10))
song_listbox.pack(pady=10)

for song in mp3_files:
    song_listbox.insert(tk.END, song)

if not mp3_files:
    song_listbox.insert(tk.END, "No .mp3 files found in 'my_songs' folder!")

# 3. Status label 
status_label = tk.Label(root, text="Status: Idle", font=("Arial", 10, "italic"), bg="#2c3e50", fg="#bdc3c7")
status_label.pack(pady=5)

# 4. Control buttons Frame
button_frame = tk.Frame(root, bg="#2c3e50")
button_frame.pack(pady=15)

# 5. Creating and placing the buttons
play_btn = tk.Button(button_frame, text="Play", width=8, command=play_selected_songs, bg="#2eec71", fg="white", font=("Arial", 10, "bold"))
play_btn.grid(row=0, column=0, padx=5)

pause_btn = tk.Button(button_frame, text="Pause", width=8, command=pause_song, bg="#f1c40f", fg="black", font=("Arial", 10, "bold"))
pause_btn.grid(row=0, column=1, padx=5)

resume_btn = tk.Button(button_frame, text="Resume", width=8, command=resume_song, bg="#3498db", fg="white", font=("Arial", 10, "bold"))
resume_btn.grid(row=0, column=2, padx=5)

stop_btn = tk.Button(button_frame, text="Stop", width=8, command=stop_song, bg="#e74c3c", fg="white", font=("Arial", 10, "bold"))
stop_btn.grid(row=0, column=3, padx=5)

# Keep the window open and running
root.mainloop()