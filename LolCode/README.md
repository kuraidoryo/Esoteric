# LolCode

[English version below](#english-version)

## Opis

LolCode (LOLCODE) to ezoteryczny język programowania zaprojektowany w 2007 roku przez Adama Lindsaya, inspirowany memem "lolcats". Składnia języka oparta jest na żartobliwym slangu internetowym, a programy rozpoczynają się od frazy `HAI`, a kończą instrukcją `KTHXBYE`.

- [LOLCODE](http://lolcode.org) - Więcej informacji na temat LOLCODE.

## Status algorytmów

- [x] **Ciąg Fibonacciego** (`fibonacci.lol`)
- [ ] Największy Wspólny Dzielnik (NWD)
- [ ] Sprawdzanie liczby pierwszej
- [ ] Rozkład na czynniki pierwsze
- [ ] Silnia

## Instrukcja uruchomienia

Do uruchomienia programów napisanych w LOLCODE wymagany jest interpreter `lci`.

Dla systemu Windows polecam używanie WSL.
- [WSL](https://learn.microsoft.com/en-us/windows/wsl/setup/environment) - Instalacja i uruchomienie WSL.

1. Zbuduj interpreter `lci` ze źródła (wymagany CMake):
   ```bash
   cd lci
   cmake .
   make 
   make install
   ```
2. Uruchom program:
   ```bash
   lci "Nazwa Pliku.lol"
   ```

---

<a name="english-version"></a>
# LolCode

## Overview

LOLCODE is an esoteric programming language created in 2007 by Adam Lindsay, inspired by the "lolcats" internet meme. The language syntax is based on playful internet slang, with programs starting with `HAI` and ending with `KTHXBYE`.

- [LOLCODE](http://lolcode.org) - More information about LOLCODE.

## Algorithm Status

- [x] **Fibonacci sequence** (`fibonacci.lol`)
- [ ] Greatest Common Divisor (GCD)
- [ ] Prime number check
- [ ] Prime factorization
- [ ] Factorial

## Execution Guide

The `lci` interpreter is required to run LOLCODE programs.

For Windows, I recommend using WSL.
- [WSL](https://learn.microsoft.com/en-us/windows/wsl/setup/environment) - Installing and setting up WSL.

1. Build the `lci` interpreter from source (CMake required):
   ```bash
   cd lci
   cmake .
   make
   make install
   ```
2. Run the program:
   ```bash
   lci "File Name.lol"
   ```