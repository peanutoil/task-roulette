import streamlit as st
import random

exec(st.secrets["TASKS"])
st.title("Task Roulette")

if st.button("Spin the Wheel"):
    task = random.choice(list(tasks.task_map.keys()))
    time_options = tasks.task_map[task]
    time_selection = random.choice(time_options)
    item_selection = None

    if time_selection < 0:
        item_selection = tasks.extra_map[time_selection][0]
        time_selection = random.choice(tasks.extra_map[time_selection][1])

    st.subheader(f"Your task: {task}")
    if item_selection:
        st.write(f"**Item Selection:** {random.choice(item_selection)}")
    st.write(f"**Duration:** {time_selection} minutes")

