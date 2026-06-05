---
title: Pandas Series – Complete Study Notes
subtitle: Beginner to Intermediate (Sections 1.1 – 1.7)
author: Study Notes
date: 2025
---

# Pandas Series – Complete Study Notes
## Beginner to Intermediate (Sections 1.1 – 1.7)

---

## Table of Contents

1. [1.1 Introduction to Pandas Series](#introduction)
2. [1.2 Series Creation](#creation)
3. [1.3 Series Indexing & Selection](#indexing)
4. [1.4 Series Operations](#operations)
5. [1.5 Missing Data Strategies](#missing-data)
6. [Interview & Exam Tips](#interview-tips)

---

<div style="page-break-after: always;"></div>

## 1.1 Introduction to Pandas Series {#introduction}

### What is a Pandas Series?

A Pandas Series is a one-dimensional labeled array that can hold data of any type — integers, floats, strings, Python objects, etc.

**Think of it like:** A super-powered Python list where every element has a label (index) attached to it.

**Practical Analogy:** A column from an Excel sheet — it has row numbers (index) and values.

---

### Case 1: Without Custom Index (Default Index)

If you do not provide explicit labels, Pandas automatically assigns a default sequential integer index starting from 0.

```python
# Create the Series without providing an index parameter
menu = pd.Series([450, 120, 60])

# Look up data using the default position number
print(menu[1])  
# Output: 120
```

**Visual Representation:**
```
Index    Values
0        450
1        120
2        60
```

---

### Case 2: With Custom Index (User-Defined Index)

When you provide explicit strings or alternative identifiers, Pandas overwrites the default integers and binds your custom names to the data values.

```python
# Create the Series with explicit, custom text labels
menu = pd.Series([450, 120, 60], index=['Pizza', 'Burger', 'Coke'])

# Look up data directly by its bound label name
print(menu['Burger'])  
# Output: 120
```

**Visual Representation:**
```
Custom Index    Values
Pizza           450
Burger          120
Coke            60
```

---

### Series vs List vs NumPy Array

| Feature | Python List | NumPy Array | Pandas Series |
|---------|------------|-------------|---------------|
| **Has Index?** | No (just positions) | No (just positions) | Yes (custom labels) |
| **Data Types** | Mixed allowed | Single dtype | Single dtype (flexible) |
| **Missing Values** | Manual handling | No built-in support | Built-in NaN support |
| **Operations** | Manual loop | Vectorized | Vectorized + label-aware |
| **Speed** | Slow | Fast | Fast |
| **Part of Pandas?** | No | No (NumPy) | Yes |

---

### Components of a Series

Every Pandas Series has **3 key components:**

1. **Data (Values):** The actual content — numbers, text, etc.
2. **Index:** Labels for each value. Default is 0, 1, 2, 3 ... (like list positions)
3. **dtype:** The data type of the values — int64, float64, object, bool, etc.

```python
import pandas as pd
 
s = pd.Series([10, 20, 30, 40])
print(s)
 
# Output:
# 0    10    <-- index 0, value 10
# 1    20    <-- index 1, value 20
# 2    30
# 3    40
# dtype: int64
```

> **💡 Quick Summary 1.1**  
> Series = labeled 1D array. It has Data + Index + dtype. Much more powerful than a plain list.

---

<div style="page-break-after: always;"></div>

## 1.2 Series Creation {#creation}

### 1. From a Python List

```python
import pandas as pd
 
# Simple list -> Series
s = pd.Series([10, 20, 30, 40])
print(s)
# 0    10
# 1    20
# 2    30
# 3    40
# dtype: int64
```

---

### 2. From a NumPy Array

```python
import numpy as np
 
arr = np.array([1.5, 2.5, 3.5])
s = pd.Series(arr)
print(s)
# 0    1.5
# 1    2.5
# 2    3.5
# dtype: float64
```

---

### 3. From a Dictionary

When you use a dict, the keys become the index and values become the data.

```python
data = {'a': 100, 'b': 200, 'c': 300}
s = pd.Series(data)
print(s)
# a    100
# b    200
# c    300
# dtype: int64
```

---

### 4. From a Scalar Value

When you give a single value, it gets repeated for every index label you provide.

```python
s = pd.Series(5, index=['x', 'y', 'z'])
print(s)
# x    5
# y    5
# z    5
# dtype: int64
```

---

### 5. Custom Index

You can define your own labels using the index parameter.

```python
marks = pd.Series([85, 90, 78], index=['Math', 'English', 'Science'])
print(marks)
# Math       85
# English    90
# Science    78
# dtype: int64
 
# Access by label:
print(marks['Math'])   # 85
```

---

### 6. Handling Missing Values (NaN)

If a key in your index does not exist in the dictionary, Pandas fills it with NaN (Not a Number) — which represents a missing value.

```python
data = {'a': 10, 'b': 20}
s = pd.Series(data, index=['a', 'b', 'c'])  # 'c' is missing
print(s)
# a    10.0
# b    20.0
# c     NaN   <-- missing value auto-filled
# dtype: float64
```

> **⚠️ Common Mistake**  
> NaN stands for Not a Number. It is used by Pandas to mark missing or undefined data. dtype becomes float64 because NaN is a float.

> **💡 Quick Summary 1.2**  
> You can create a Series from a list, NumPy array, dict, or scalar. Custom indexes make data much more readable. Missing keys become NaN.

---

<div style="page-break-after: always;"></div>

## 1.3 Series Indexing & Selection {#indexing}

There are **5 ways** to select data from a Series. Each works differently.

| Method | Based On | Syntax Example |
|--------|----------|-----------------|
| Label-based | Index label (name) | `s['Math']` |
| Position-based | Integer position (0,1,2...) | `s[0]` |
| Slicing | Range of positions or labels | `s[1:3]` |
| Boolean indexing | True/False condition | `s[s > 50]` |
| Fancy indexing | List of labels/positions | `s[['a','b']]` |

---

### Label-Based Indexing

```python
marks = pd.Series([85, 90, 78], index=['Math', 'English', 'Science'])
 
print(marks['Math'])      # 85  -- single label
print(marks[['Math', 'Science']])  # fancy: multiple labels
```

---

### Position-Based Indexing

```python
s = pd.Series([10, 20, 30, 40])
 
print(s[0])    # 10  -- first element
print(s[-1])   # 40  -- last element (Python-style negative)
```

---

### Slicing

```python
s = pd.Series([10, 20, 30, 40, 50])
 
print(s[1:4])   # positions 1, 2, 3 (4 excluded)
# 1    20
# 2    30
# 3    40
```

---

### Boolean Indexing

Filter rows based on a True/False condition.

```python
marks = pd.Series([85, 45, 90, 30, 78], index=['Math','Bio','Eng','Hist','Sci'])
 
# Get only subjects where marks > 70
print(marks[marks > 70])
# Math    85
# Eng     90
# Sci     78
```

---

### .loc[] — Label-based (Recommended)

`.loc[]` is the explicit way to access data by index labels.

```python
marks = pd.Series([85, 90, 78], index=['Math', 'English', 'Science'])
 
print(marks.loc['Math'])             # 85
print(marks.loc['Math':'Science'])    # slice by label (INCLUSIVE)
print(marks.loc[['Math','Science']])  # multiple labels
```

---

### .iloc[] — Position-based (Recommended)

`.iloc[]` is the explicit way to access data by integer position.

```python
marks = pd.Series([85, 90, 78], index=['Math', 'English', 'Science'])
 
print(marks.iloc[0])      # 85  -- first item
print(marks.iloc[-1])     # 78  -- last item
print(marks.iloc[0:2])    # 85, 90 (2 excluded)
print(marks.iloc[[0,2]])  # 85, 78 (positions 0 and 2)
```

---

### .loc[] vs .iloc[] Comparison

| Feature | .loc[] | .iloc[] |
|---------|--------|---------|
| **Based on** | Index labels (names) | Integer positions (0,1,2...) |
| **Slicing end** | INCLUSIVE | EXCLUSIVE (like Python) |
| **Works when index is** | String / custom labels | Always (ignores label names) |
| **Best for** | Named indexes | Positional access |

> **⚠️ Common Mistake**  
> `s.loc[0:2]` includes index 2 (inclusive). `s.iloc[0:2]` EXCLUDES index 2. Always remember this difference!

---

<div style="page-break-after: always;"></div>

## 1.4 Series Operations {#operations}

### Arithmetic Operations

Operations happen element-by-element automatically — no loops needed!

```python
s = pd.Series([10, 20, 30, 40])
 
print(s + 5)    # [15, 25, 35, 45]  -- add 5 to each
print(s * 2)    # [20, 40, 60, 80]  -- multiply each by 2
print(s - 3)    # [7, 17, 27, 37]
print(s / 10)   # [1.0, 2.0, 3.0, 4.0]
print(s ** 2)   # [100, 400, 900, 1600] -- power
print(s % 3)    # [1, 2, 0, 1]  -- modulo
```

---

### Broadcasting

Broadcasting means applying an operation between a Series and a scalar (single number) — it applies to ALL elements automatically.

```python
# Broadcasting example -- add scalar to entire Series
prices = pd.Series([100, 200, 300], index=['Apple', 'Mango', 'Grape'])
discounted = prices * 0.9   # 10% discount on all
print(discounted)
# Apple    90.0
# Mango    180.0
# Grape    270.0
```

---

### Operations Between Two Series

When you operate on two Series, Pandas aligns by index label first, then does the operation.

```python
s1 = pd.Series([1, 2, 3], index=['a', 'b', 'c'])
s2 = pd.Series([10, 20, 30], index=['a', 'b', 'c'])
 
print(s1 + s2)
# a    11
# b    22
# c    33
```

---

### Comparison Operations

Returns a Series of True/False values.

```python
s = pd.Series([10, 20, 30, 40])
 
print(s > 20)   # [False, False, True, True]
print(s == 30)  # [False, False, True, False]
print(s != 10)  # [False, True, True, True]
 
# Use comparison result to filter:
print(s[s > 20])  # [30, 40]
```

---

### Vectorized Operations

Vectorized means no for-loop needed. Pandas applies the function to all elements at once (very fast).

```python
import numpy as np
 
s = pd.Series([1, 4, 9, 16])
 
# Apply NumPy functions -- works on entire Series at once
print(np.sqrt(s))    # [1.0, 2.0, 3.0, 4.0]
print(np.log(s))     # natural log of each element
print(s.apply(lambda x: x * 2))  # custom vectorized function
```

> **💡 Quick Summary 1.4**  
> All math operations in Pandas are vectorized (no loops needed). Two Series align by index before operating. Use comparison operators to filter data.

---

<div style="page-break-after: always;"></div>

## Interview & Exam Tips {#interview-tips}

**Q: What is the difference between Series and DataFrame?**  
A: A Series is 1D (one column). A DataFrame is 2D (multiple columns, each is a Series).

**Q: What is the difference between .loc and .iloc?**  
A: `.loc` uses labels; `.iloc` uses integer positions. `.loc` slicing is INCLUSIVE, `.iloc` is EXCLUSIVE at the end.

**Q: What happens when you add two Series with different indexes?**  
A: Pandas aligns by index. Unmatched labels give NaN in the result.

**Q: How do you count unique values in a Series?**  
A: Use `s.value_counts()` for frequency counts. Use `s.nunique()` for the count of unique values.

**Q: What is vectorization?**  
A: Applying an operation to all elements at once without writing a loop. Pandas and NumPy both support this.

---

<div style="page-break-after: always;"></div>

# Pandas Data Loading — Complete Notes
## CSV • Excel • JSON

---

## 1. Basics of Data Loading

### What is Data Loading?

Data Loading is the process of importing data from external sources (such as files, databases, or APIs) into a program or system so that it can be processed, analyzed, or manipulated.

**Intuition:** Think of it like opening a spreadsheet in Excel — except here, Python reads it automatically and you can do much more with it.

---

### Structured vs Semi-Structured Data

#### Structured Data
**Definition:** Structured data refers to data that is organized in a predefined and fixed format, typically in the form of rows and columns. This structure makes it easy to store, access, and analyze using traditional data processing tools.

**Examples:**
- CSV (Comma-Separated Values) files
- Excel spreadsheets

#### Semi-Structured Data
**Definition:** Semi-structured data refers to data that does not follow a rigid tabular structure but still maintains some level of organization through tags, keys, or markers. This allows the data to be flexible while still being interpretable.

**Examples:**
- JSON (JavaScript Object Notation)
- XML files

| Type | Example | Shape |
|------|---------|-------|
| **Structured** | CSV, Excel | Rows & columns — like a table |
| **Semi-Structured** | JSON | Key-value pairs, can be nested |

---

## 2. Core Loading Functions

**Definition:** Core loading functions are built-in methods in data libraries (such as pandas) that allow you to quickly read data from a file and convert it into a structured format (like a DataFrame) for analysis.

**Intuition:** With just one function call, you can load data from a file into your program and start working with it immediately.

---

### The Three Main Functions

| Function | File Type | Returns |
|----------|-----------|---------|
| `pd.read_csv()` | .csv / .tsv | DataFrame |
| `pd.read_excel()` | .xlsx / .xls | DataFrame (or dict of DataFrames) |
| `pd.read_json()` | .json / JSON string | DataFrame |

---

### Basic Syntax — Read, Then Inspect

```python
import pandas as pd

# ── CSV
df = pd.read_csv("students.csv")

# ── Excel
df = pd.read_excel("sales.xlsx")

# ── JSON
df = pd.read_json("data.json")

# ── Always inspect right after loading
df.head() # first 5 rows
```

**Preview of loaded DataFrame:**
```
   Name  Age  Score
0  Alice   22     85
1    Bob   21     90
2  Carol   23     78
```

**What gets returned?**

Every read function returns a DataFrame — a 2D table with labeled rows and columns. You can immediately use `.head()`, `.info()`, and `.describe()` on it. If you load Excel with `sheet_name=None`, you get a dict of DataFrames instead.

---

## 3. File Path Handling

**Definition:** File path handling is the process of correctly specifying the location of a file so that a program can locate and access it for reading or writing operations.

**Intuition:** A program can only work with a file if it knows its exact location. An incorrect or missing path prevents the program from accessing the file.

---

### Types of File Paths

#### 1. Relative Path
A relative path specifies the file location with respect to the current working directory.

```python
df = pd.read_csv("students.csv")
```

#### 2. Absolute Path
An absolute path specifies the complete location of a file starting from the root directory of the system.

```python
# Windows
df = pd.read_csv(r"C:\Users\you\data\students.csv")

# Mac / Linux
df = pd.read_csv("/home/you/data/students.csv")
```

---

### Relative vs Absolute Path

| What it does | Code | Notes |
|-------------|------|-------|
| **Relative path** | `df = pd.read_csv("data/students.csv")` | Described relative to your current script's location. Portable — works on any machine. |
| **Absolute path** | `df = pd.read_csv(r"C:\Users\you\data\file.csv")` | Full path from the root of the system. Not portable — only works on your machine. |

---

### Best Practice: pathlib

Use `pathlib.Path` — it works on ALL operating systems automatically.

```python
from pathlib import Path

path = Path("data") / "students.csv"
df = pd.read_csv(path)
```

---

### From a URL

Pandas can load files directly from the internet — no download needed.

```python
url = "https://example.com/data.csv"
df = pd.read_csv(url)
```

---

### Handling File Not Found

```python
import os

# Check if file exists before loading
if os.path.exists("students.csv"):
    df = pd.read_csv("students.csv")
else:
    print("File not found! Check the path.")

# Or use try-except
try:
    df = pd.read_csv("students.csv")
except FileNotFoundError:
    print("Error: File does not exist at given path.")
```

> **⚠️ Common Error**  
> `FileNotFoundError: [Errno 2] No such file or directory: 'students.csv'`  
> **Fix:** Check spelling, check folder, use absolute path to debug.

---

## 4. Understanding File Structure Before Loading

**Intuition:** Before you load a file, look at it. Knowing the structure prevents 80% of loading bugs.

---

### CSV Structure

```
# A CSV file is just plain text
# Line 1 is usually the header (column names)
# Each following line = one row of data
# Values are separated by a delimiter (usually comma)

Name,Age,Score
Alice,22,85
Bob,21,90

# Tab-separated (TSV): values separated by tabs
Name	Age	Score
Alice	22	85
```

---

### Excel Structure

An Excel file (.xlsx) is not plain text. It contains:
- **Multiple Sheets** (tabs at the bottom of the file)
- **Formatted cells** with styles, formulas, merged cells
- Pandas reads raw values only — it ignores formulas and styles
- **Default:** Pandas loads the first sheet

---

### JSON Structure — 3 Types You Will See

#### Type 1: List of Dictionaries (Most Common)
```json
[
  {"Name": "Alice", "Age": 22, "Score": 85},
  {"Name": "Bob",   "Age": 21, "Score": 90}
]
```
*Each dict = one row. This loads perfectly into a DataFrame.*

#### Type 2: Key-Value / Column Format
```json
{
  "Name":  {"0": "Alice", "1": "Bob"},
  "Age":   {"0": 22,      "1": 21},
  "Score": {"0": 85,      "1": 90}
}
```

#### Type 3: Nested JSON (Requires Flattening)
```json
[
  {"Name": "Alice", "Address": {"City": "Delhi", "Pin": 110001}},
  {"Name": "Bob",   "Address": {"City": "Mumbai", "Pin": 400001}}
]
```
*After flattening: columns become Name | Address.City | Address.Pin*

---

## 5. Performance & Optimization

**Intuition:** Large files can crash your notebook if loaded carelessly. These strategies let you work with big data without running out of memory.

---

### Strategy 1: Load Only What You Need

```python
# A file has 50 columns. You only need 3.
# SLOW — loads all 50 columns
df = pd.read_csv("bigfile.csv")

# FAST — loads only 3 columns
df = pd.read_csv("bigfile.csv",
    usecols=["CustomerID", "Revenue", "Date"])
```

---

### Strategy 2: Reduce Memory with dtypes

```python
# Python's default int64 uses 8 bytes per value
# If values are small (0-255), use int8 → 1 byte each

df = pd.read_csv("data.csv",
    dtype={"Age": "int8", "Score": "int16"})

# This alone can reduce memory by 4-8x for large files
```

---

### Strategy 3: Chunk Large Files

```python
# Instead of loading 5 GB at once, read 10,000 rows at a time
results = []

for chunk in pd.read_csv("bigfile.csv", chunksize=10000):
    # Process each chunk — filter, aggregate, etc.
    filtered = chunk[chunk["Revenue"] > 1000]
    results.append(filtered)

# Combine all processed chunks
final_df = pd.concat(results, ignore_index=True)
```

> **Memory Comparison**  
> Loaded 5,000,000 rows with only 150 MB RAM used.  
> (Without chunksize: would need ~4 GB RAM)

---

<div style="page-break-after: always;"></div>

# Missing Data in Pandas
## Deep-Dive Strategy Guide

---

## Part 0 — Types of Missing Data

Before choosing any strategy, you must understand **WHY** data is missing. This is the most overlooked step, and skipping it leads to strategies that silently corrupt your analysis.

Statisticians classify missing data into three types:

| Type | Full Name | What It Means | Example |
|------|-----------|---------------|---------|
| **MCAR** | Missing Completely At Random | The gap has nothing to do with any value in the dataset — it is pure chance. | A lab technician accidentally skips one row while entering data. |
| **MAR** | Missing At Random | The gap is related to other observed columns, but NOT the missing value itself. | Older patients are less likely to fill in the digital survey — but age is recorded. |
| **MNAR** | Missing Not At Random | The gap is directly related to the missing value itself — the data is hiding something. | People with very low income skip the income question because they are embarrassed. |

---

### Why MNAR is the Most Dangerous

MNAR cannot be fixed by filling or dropping alone. If low-income people skip the income field, dropping those rows makes your remaining dataset biased toward higher incomes. Filling with the mean gives them an unrealistically high income. **The data is missing because of the true value — there is no safe mechanical fix.** You must investigate the cause and sometimes collect more data.

---

## Part 1 — Filling with Statistical Measures

The most common approach: replace missing values with a single computed number. Simple, fast, and widely used — but each measure has specific conditions where it silently fails.

---

### Strategy 1.1 — Fill with the Mean

#### When it works well

Use mean fill when:
- The data is numeric, roughly symmetric (bell-shaped)
- Has no significant outliers
- The percentage of missing values is low (< 10%)

**Classic examples:** Heights of adults, test scores on a well-designed exam, manufacturing measurements within tight tolerances.

---

#### How Mean Fill Works — Step by Step

```python
# Calculate the mean of existing (non-missing) values
mean_val = df['Score'].mean()  # ignores NaN automatically
print(f'Mean: {mean_val}')
 
# Fill all missing cells with that single value
df['Score'].fillna(mean_val, inplace=True)
 
# Or in one line:
df['Score'].fillna(df['Score'].mean(), inplace=True)
```

| Student | Score (Before) | Score (After mean fill) |
|---------|----------------|------------------------|
| A | 85 | 85 |
| B | 90 | 90 |
| C | NaN | 85.0  ← replaced with mean |
| D | 78 | 78 |
| E | NaN | 85.0  ← replaced with mean |
| F | 87 | 87 |

*Mean of {85,90,78,87} = 85.0*

---

#### Failure Mode 1 — Outliers Distort the Mean

The mean is calculated by adding all values and dividing by the count. One extreme value shifts the entire result. This is not a minor edge case — it is a very common real-world problem with salary, house price, and revenue data.

| Employee | Salary (INR) | Role |
|----------|--------------|------|
| A | 48,000 | Junior Dev |
| B | 51,000 | Junior Dev |
| C | 49,000 | Junior Dev |
| D | NaN | Junior Dev — MISSING |
| E | 7,50,000 | VP Engineering (outlier!) |

```python
salaries = [48000, 51000, 49000, 750000]  # D is missing
mean = sum(salaries) / len(salaries)
print(f'Mean: {mean}')  # Output: Mean: 224500.0
 
# Employee D gets 2,24,500 filled in — nearly 5x their actual peer salaries!
```

> **❌ What goes wrong**  
> The missing Junior Dev gets a salary of 2,24,500 INR — almost 5 times what their actual colleagues earn. Any model trained on this data will now think Junior Devs earn a quarter million. Statistical summaries for that role become meaningless.

---

#### ✅ Fix — Use Median for Skewed / Outlier Data

**Rule:** Before filling with mean, always check for outliers using a boxplot or by comparing mean vs. median. If they differ significantly (e.g., mean is 30% higher than median), use median instead.

```python
print(f"Mean:   {df['Salary'].mean():.0f}")
print(f"Median: {df['Salary'].median():.0f}")
 
# If mean >> median, outliers are present -> use median
df['Salary'].fillna(df['Salary'].median(), inplace=True)
```

---

#### Failure Mode 2 — Mean Collapses Variance

When you fill many missing values with the same single number (the mean), you artificially reduce the spread of the data. The dataset looks more uniform than it really is.

```python
# Original column has 40% missing values
print(df['Age'].std())  # Before fill: 12.4
df['Age'].fillna(df['Age'].mean(), inplace=True)           	
print(df['Age'].std())  # After fill:   8.1  <- artificially lower!
 
# Correlation between Age and other columns also weakens because
# filled values are all the same flat number
```

> **❌ What goes wrong**  
> The standard deviation drops from 12.4 to 8.1. Correlation coefficients with other columns weaken. A machine learning model trained on this data underestimates how much Age varies — causing poor predictions for ages far from the mean.

---

#### ✅ Fix — Use Random Sampling for High Missingness

**Rule:** If more than 15-20% of values are missing, single-value fill (mean or median) is too crude. Use random sampling from the existing distribution, or model-based imputation.

```python
# Sample randomly from existing values to preserve distribution shape
existing = df['Age'].dropna()
n_missing = df['Age'].isnull().sum()
fill_vals = existing.sample(n=n_missing, replace=True).values
df.loc[df['Age'].isnull(), 'Age'] = fill_vals
```

---

### Strategy 1.2 — Fill with the Median

#### When it works well

Use median fill when:
- The column is numeric and has outliers or a skewed distribution

**Classic examples:** Salaries, house prices, income, age of populations (where very old ages pull the mean up), number of hospital visits, e-commerce order values.

---

#### Why Median is Robust to Outliers

The median is simply the middle value when all values are sorted. Adding or removing extreme values does not change the middle — only the total count matters for positioning.

| Dataset | Values (Sorted) | Mean | Median |
|---------|-----------------|------|--------|
| No outlier | 10, 12, 15, 18, 20 | 15.0 | 15 |
| With outlier | 10, 12, 15, 18, 500 | 111.0 | 15  (unchanged) |

---

#### Failure Mode 1 — Global Median Ignores Group Differences

A single global median treats all rows as one population. If your data has distinct sub-groups with different distributions, you assign the wrong value to each group.

| Dept | Salaries (INR) | Group Median | Global Median |
|------|----------------|--------------|---------------|
| Engineering | 80K, 90K, 85K, NaN | 85,000 | 52,000 ← WRONG |
| Sales | 35K, 40K, 45K, NaN | 40,000 | 52,000 ← WRONG |
| Marketing | 50K, 55K, 60K, NaN | 55,000 | 52,000 ← WRONG |

> **❌ What goes wrong**  
> The global median of all salaries is 52,000. An Engineering row gets 52K filled in when its peers earn 80-90K. A Sales row also gets 52K when its peers earn 35-45K. Both are wrong in opposite directions.

---

#### ✅ Fix — Use Group-Wise Median

**Rule:** Whenever your dataset has categorical groups (Department, City, Product Type, Customer Segment), always fill numeric missing values with the median calculated within each group, not globally.

```python
# Fill Salary NaN with the median salary of THAT department
df['Salary'] = df.groupby('Department')['Salary'].transform(
	lambda x: x.fillna(x.median())
)
 
# Verify — each department now has its own median applied
print(df.groupby('Department')['Salary'].agg(['median', 'count']))
```

---

#### Failure Mode 2 — Median on Categorical Data

Students sometimes apply median to columns that look numeric but are actually categorical codes (like product_category_id = 1, 2, 3 or customer_tier = 1, 2, 3). The median of category codes is meaningless.

> **❌ What goes wrong**  
> Example: Product categories are encoded as 1=Electronics, 2=Clothing, 3=Food. The median is 2, so Pandas fills missing categories with '2' (Clothing). But 'middle-of-the-number-line' has no meaning for categories. You are not filling with the most common category — you are filling with whichever one was assigned number 2.

---

#### ✅ Fix — Use Mode for Categorical Columns

Always check whether a numeric column is truly continuous or is actually an encoded category before choosing your strategy.

```python
# Check if column is categorical despite being stored as int
print(df['category_id'].nunique())   # If few unique values -> likely categorical
print(df['category_id'].value_counts())
 
# For true categoricals, use mode not median
df['category_id'].fillna(df['category_id'].mode()[0], inplace=True)
```

---

### Strategy 1.3 — Fill with the Mode (Most Frequent Value)

#### When it works well

Use mode fill when: the column is categorical (text or encoded labels).

**Examples:** Gender, City, Country, Product Category, Payment Method, Job Title. The mode gives you the most common category, which is a reasonable default for a missing label.

---

#### How Mode Fill Works

```python
# mode() returns a Series — take index [0] for the top value
top_gender = df['Gender'].mode()[0]
print(f'Most common gender: {top_gender}')
 
df['Gender'].fillna(top_gender, inplace=True)
 
# For multiple categorical columns at once:
cat_cols = ['Gender', 'City', 'PaymentMethod']
for col in cat_cols:
	df[col].fillna(df[col].mode()[0], inplace=True)
```

---

#### Failure Mode 1 — Amplifying Class Imbalance

If one category already dominates, filling all missing values with that mode makes the imbalance even worse. This introduces bias that can harm models and analysis.

| Gender | Count Before Fill | % Before Fill | After Filling 200 NaN with 'Male' | % After Fill |
|--------|------------------|---------------|---------------------------------|--------------|
| Male | 800 | 80% | 1,000 | 83% |
| Female | 180 | 18% | 180 | 15% |
| Other | 20 | 2% | 20 | 2% |
| NaN | 200 | 20% of total | 0 | |

> **❌ What goes wrong**  
> The Male category grows from 80% to 83%. Female shrinks from 18% to 15%. Any model trained to predict gender-based outcomes will now be even more biased toward Male. If you are studying income disparity by gender, the 200 NaN rows — which may have been Female customers — are now incorrectly recorded as Male.

---

#### ✅ Fix — Use 'Unknown' as a Neutral Category

**Rule:** For sensitive or imbalanced categories, never fill with the mode. Instead, create a new label like 'Unknown' or 'Not Provided'. This preserves the uncertainty rather than making a wrong guess, and lets downstream models treat missingness as its own category.

```python
df['Gender'].fillna('Unknown', inplace=True)
 
# Now Gender has 4 values: Male, Female, Other, Unknown
# A model can learn patterns specific to 'Unknown' group
print(df['Gender'].value_counts())
```

---

#### Failure Mode 2 — Mode When There Are Multiple Modes

Pandas `mode()[0]` just takes the first one alphabetically or by index if there is a tie. You have no control over which one gets chosen.

```python
# Suppose City has equal counts of Mumbai and Delhi
print(df['City'].value_counts())
# Mumbai	50
# Delhi 	50
# Kolkata   30
 
# mode()[0] will return 'Delhi' (comes first alphabetically)
# This is an arbitrary choice with no analytical basis
print(df['City'].mode()[0])   # 'Delhi'
```

---

#### ✅ Fix — Check for ties and handle explicitly

When mode is ambiguous, treat missing as 'Unknown'. For city data specifically, consider filling from a related column (e.g., postal code or region) if available.

---

## Part 2 — Time-Series Strategies

When your data is ordered in time (stock prices, sensor readings, weather data), the relationship between consecutive rows is meaningful. The strategies in this section exploit that ordering.

---

### Strategy 2.1 — Forward Fill (ffill / pad)

#### When it works well

Use ffill when:
- Values change slowly and continuously over time
- Stock prices, temperature readings, exchange rates — where today's missing reading is likely very close to yesterday's reading
- Also good for status flags: if someone's subscription was 'Active' last month and you have no update, it is reasonable to carry that forward.

---

#### Visualizing Forward Fill

| Timestamp | Temperature (Before) | Temperature (After ffill) |
|-----------|----------------------|---------------------------|
| 09:00 | 22.1°C | 22.1°C |
| 10:00 | NaN | 22.1°C  ← copied from 09:00 |
| 11:00 | NaN | 22.1°C  ← still carrying forward |
| 12:00 | 24.3°C | 24.3°C |
| 13:00 | NaN | 24.3°C  ← copied from 12:00 |
| 14:00 | 25.0°C | 25.0°C |

```python
# Sort by time first! ffill only works correctly on sorted data
df = df.sort_values('Timestamp')
 
df.ffill(inplace=True)          	# Fill all columns
df['Temperature'].ffill(inplace=True)  # Fill one column only
```

---

#### Failure Mode 1 — Long Consecutive Gaps Create Stale Data

If the sensor was offline for 6 hours, ffill copies the last reading for all 6 hours. The filled data shows a flat line where the real temperature was actually rising or falling. Any analysis of that window will be wrong.

| Hour | Real Temp | After ffill (no limit) | What Actually Happened |
|------|-----------|----------------------|----------------------|
| 08:00 | 22°C | 22°C | OK |
| 09:00 | NaN | 22°C | Real: ~23°C — slightly off |
| 10:00 | NaN | 22°C | Real: ~24°C — getting worse |
| 11:00 | NaN | 22°C | Real: ~26°C — significantly off |
| 12:00 | NaN | 22°C | Real: ~28°C — very wrong |
| 13:00 | NaN | 22°C | Real: ~30°C — completely wrong |
| 14:00 | 30°C | 30°C | Sensor back online |

> **❌ What goes wrong**  
> The dataset shows 22°C from 08:00 to 14:00 — completely flat. In reality the temperature rose 8 degrees. An anomaly detection system would miss this rise entirely. An energy-efficiency model would think the building needed no cooling during that window.

---

#### ✅ Fix 1 — Set a limit on how far to carry forward

The `limit` parameter restricts ffill to filling at most N consecutive NaN values. After that, cells remain NaN and you can handle them separately.

```python
# Only fill up to 2 consecutive missing readings
df['Temperature'].ffill(limit=2, inplace=True)
 
# Gaps longer than 2 remain NaN -> you know they need special treatment
remaining_gaps = df['Temperature'].isnull().sum()
print(f'Remaining gaps after limited ffill: {remaining_gaps}')
```

---

#### ✅ Fix 2 — Combine ffill with interpolation for longer gaps

Use ffill for small gaps (1-2 readings) and switch to interpolation for larger gaps where a smooth estimate is better than a flat stale value.

```python
# 1. Forward fill short gaps (up to 2 readings)
df['Temp'].ffill(limit=2, inplace=True)
 
# 2. For remaining longer gaps, use linear interpolation
df['Temp'].interpolate(method='linear', inplace=True)
```

---

#### Failure Mode 2 — Using ffill on Unsorted Data

ffill works row by row in the order the data appears. If the DataFrame is not sorted by time, the 'previous' row is meaningless — you copy from the wrong point in time.

> **❌ What goes wrong**  
> Always sort by your time column before ffill. If your data has multiple entities (e.g., sensor readings from 10 different machines in one DataFrame), sort by (entity_id, timestamp) so each machine's readings are filled independently.

```python
# Correct pattern for multi-entity time series
df = df.sort_values(['SensorID', 'Timestamp'])
 
# Fill within each sensor's group, not across sensors
df['Reading'] = df.groupby('SensorID')['Reading'].ffill(limit=3)
```

---

### Strategy 2.2 — Backward Fill (bfill)

#### When it works well

Use bfill when:
- You want to fill an early gap using the next known value
- Common in financial data where you know the end-of-month price and want to back-fill days earlier in the month
- Also useful when a starting baseline is missing and you know the later value.

---

#### Failure Mode — bfill Uses Future Information

bfill copies the NEXT value backward. This means you are using future data to explain the past. This is called **data leakage** in machine learning.

> **❌ What goes wrong — Data Leakage**  
> Example: You are predicting whether a stock will rise tomorrow. A feature column 'news_sentiment' has missing values. You use bfill — so today's missing sentiment gets filled with tomorrow's actual sentiment. Your model now has access to tomorrow's data while predicting tomorrow. It will appear to perform perfectly in testing but will fail completely in production.

---

#### ✅ Fix — Only use bfill for non-predictive features

bfill is safe for data analysis and reporting. Never use it on predictor features in a forecasting or prediction model. Use ffill instead (ffill only uses past data).

---

## Part 3 — Dropping Missing Values

Dropping is fast and removes uncertainty — but it always costs you data. The key question is: can you afford to lose those rows, and are you losing them randomly?

---

### When Dropping is Safe

| Condition | Safe to Drop? | Why |
|-----------|--------------|-----|
| < 5% of rows have missing values | Yes | Small loss, negligible bias if MCAR |
| Missing values are MCAR (completely random) | Yes | No systematic bias introduced |
| The column with missing values is not important for analysis | Yes | Low information cost |
| 10-30% of rows have missing values | Be careful | Significant data loss, check for bias |
| > 30% of rows have missing values | No | Too much loss, likely biased — impute instead |
| Missing is related to the outcome variable (MNAR) | Never | Guaranteed bias — fix the root cause |

---

### Failure 1 — Dropping Rows with MNAR Data

If the reason data is missing is related to the actual value (MNAR), then the rows you drop are not a random sample. The remaining rows are systematically different.

> **Detailed Example — Income Survey**  
> **Dataset:** 10,000 people surveyed about income. 2,000 did not answer the income question.  
> **Why missing?** Investigation reveals that 78% of non-responders are in the bottom income quartile. They skipped the question because they were uncomfortable sharing low income numbers.  
> **You drop those 2,000 rows.** Now your dataset has 8,000 people. The mean income of your sample jumps from 42,000 to 61,000 INR per month. You conclude that the average Indian professional earns 61K/month. Your report is wrong.  
> **The fix:** You cannot fix MNAR by dropping or filling. You need to either collect the missing data through a different method, use a model that accounts for selection bias, or at minimum report that the data has systematic missingness and bound your estimates.

---

### Failure 2 — Dropping Too Many Rows

```python
print(f'Original rows: {len(df)}')         	# 10,000
 
# Multiple columns have missing values, but in different rows
print(df.isnull().sum())
# Age  	: 800 missing
# Income   : 600 missing
# Education: 700 missing
# City 	: 300 missing
 
# Dropping any row with ANY missing value:
clean = df.dropna()
print(f'After dropna: {len(clean)}')       	# 7,200 -- lost 28%!
 
# The overlap of missing rows across columns causes dramatic loss
```

> **❌ What goes wrong**  
> When you have 4 columns each with 5-8% missing, the union of all rows with any missing value can be 25-30% of your data. You lose more than a quarter of your dataset even though each individual column looked fine.

---

#### ✅ Fix — Use thresh or subset to be selective

```python
# Only drop rows that are missing MORE THAN 50% of their values
min_cols = int(len(df.columns) * 0.5)   # at least 50% must be present
df.dropna(thresh=min_cols, inplace=True)
 
# Only check for missing values in your most critical columns
df.dropna(subset=['Income', 'Age'], inplace=True)
 
# Fill the less critical columns instead
df['City'].fillna('Unknown', inplace=True)
df['Education'].fillna(df['Education'].mode()[0], inplace=True)
```

---

<div style="page-break-after: always;"></div>

---

**Document Version:** 1.0  
**Last Updated:** June 5, 2025  
**Pandas Series Notes** | Complete Study Guide

