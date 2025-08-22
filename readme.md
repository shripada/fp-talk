# JupyterLab with Deno (TypeScript Kernel)

This guide shows how to run **TypeScript** code inside **JupyterLab** and **VSCode Jupyter notebooks** using [Deno](https://deno.land/).

---

## 📦 Prerequisites

- **Python 3.8+**
- **pip**
- **VSCode** (optional, for Jupyter extension)
- **Deno** runtime

---

## 🔹 Step 1: Install JupyterLab

Install JupyterLab via `pip`:

```bash
python3 -m pip install jupyterlab
```

Run it to check:

```bash
jupyter lab
```

This should open JupyterLab in your browser.

---

## 🔹 Step 2: Install Deno

If you don’t already have [Deno](https://deno.land/):

**macOS/Linux**

```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
```

**Windows (PowerShell)**

```powershell
irm https://deno.land/install.ps1 | iex
```

Verify installation:

```bash
deno --version
```

---

## 🔹 Step 3: Install the Deno Jupyter Kernel

Jupyter uses **kernels** for different languages. To add TypeScript support via Deno:

```bash
deno install --unstable -A -f https://deno.land/x/jupyter/install.ts
```

This command installs the `deno-jupyter` executable. Now, register the kernel with Jupyter:

```bash
deno-jupyter --install
```

Check that it’s installed:

```bash
jupyter kernelspec list
```

You should see something like:

```
deno     /Users/you/Library/Jupyter/kernels/deno
python3  /.../kernels/python3
```

---

## 🔹 Step 4: Run Deno in JupyterLab

Launch JupyterLab:

```bash
jupyter lab
```

From the JupyterLab launcher, you can now open the `functions.ipynb` notebook file. If prompted, or to change the kernel, select:

**`Deno (TypeScript/JavaScript)`**

---

## 🔹 Step 5: Open file functions.ipnyb

Choose the deno kernel.

## 🔹 Step 6: VSCode Jupyter Extension (Optional)

You can also use the same setup in **VSCode**.

### Install Extensions

## ✅ Summary

- JupyterLab is installed via `pip`.
- Deno is installed separately.
- `jupyter_deno` adds a Deno-based TypeScript kernel.
- Works seamlessly in both **JupyterLab** and **VSCode notebooks**.
