# Ajsone

[English version below](#english-version)

## Opis

Ajsone to ezoteryczny język programowania, w którym cały kod źródłowy zapisywany jest jako poprawny obiekt w formacie JSON. Wywołania funkcji, zmienne oraz wbudowane operatory są definiowane za pomocą pary klucz-wartość, gdzie prefiks `=` oznacza odwołanie do zmiennej lub wywołanie funkcji.

* [Ajsone](http://quaxio.com/ajsone/) - Więcej informacji na temat Ajsone.

## Status algorytmów

- [x] **Ciąg Fibonacciego** (`fibonacci.json`)
- [ ] Największy Wspólny Dzielnik (NWD)
- [ ] Sprawdzanie liczby pierwszej
- [ ] Rozkład na czynniki pierwsze
- [x] **Silnia** (`factorial.json`)

## Instrukcja uruchomienia

Do uruchomienia programów napisanych w Ajsone wymagane jest środowisko Node.js oraz interpreter w pliku `ajsone.js`.

Zmiana danych wejściowych wymaga ręcznej edycji wywołania funkcji na końcu pliku i podania nowych argumentów.

1. Upewnij się, że masz zainstalowany Node.js (`node -v`).
2. Umieść skrypt interpretera `ajsone.js` w katalogu ze swoimi plikami `.json`.
3. Uruchom skrypt, przekazując plik programu jako argument:
   ```bash
   node ajsone.js "NazwaPliku.json"
   ```

---

<a name="english-version"></a>
# Ajsone

## Overview

Ajsone is an esoteric programming language where the entire program structure is written as valid JSON. Function calls, variable assignments, and built-in operations are represented as key-value pairs, with keys prefixed by `=` denoting variable dereferences or function applications.

* [Ajsone](http://quaxio.com/ajsone/) - More information about Ajsone.

## Algorithm Status

- [x] **Fibonacci sequence** (`fibonacci.json`)
- [ ] Greatest Common Divisor (GCD)
- [ ] Prime number check
- [ ] Prime factorization
- [x] **Factorial** (`factorial.json`)

## Execution Guide

Node.js is required to run Ajsone programs via the `ajsone.js` interpreter script.

Changing the input data requires manually editing the function call at the end of the file and providing new arguments.

1. Ensure Node.js is installed on your system (`node -v`).
2. Place the `ajsone.js` interpreter in your project root directory.
3. Execute the program by passing the target JSON file as an argument:
   ```bash
   node ajsone.js "FileName.json"
   ```