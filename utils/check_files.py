import os


def get_file_list():
    file_list = [file for file in os.listdir("./") if "2022" in file]
    file_list = sorted(file_list)
    total_file_cnt = len(file_list)
    return file_list, total_file_cnt
  
  
def make_info(file_list, total_file_cnt):
    info = f"## TIL List\nTotal TIL Count: {total_file_cnt}개\n"
    for file in file_list:
        temp = f"- [{file}](https://github.com/chaerin-dev/connecTo_TIL/blob/main/{file})\n"
        info += temp
    return info
    

def make_read_me(info):
    return f"""# connecTo_TIL
Zerobase connecTo 프론트엔드 스쿨 1기 TIL<br><br>
{info}
"""


def update_readme():
    file_list, total_file_cnt = get_file_list()
    info = make_info(file_list, total_file_cnt)
    readme = make_read_me(info)
    return readme


if __name__ == "__main__":
    readme = update_readme()
    with open("./README.md", 'w', encoding='utf-8') as f:
        f.write(readme)
