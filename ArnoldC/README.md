# ArnoldC

[English version below](#english-version)

## Opis

ArnoldC to ezoteryczny język programowania, w którym słowa kluczowe zostały zastąpione kultowymi cytatami z filmów z udziałem Arnolda Schwarzeneggera. Każdy program w tym języku rozpoczyna się od instrukcji `IT'S SHOWTIME`, a kończy klauzulą `YOU HAVE BEEN TERMINATED`.

* [ArnoldC](http://lhartikk.github.io/ArnoldC) - Więcej informacji na temat ArnoldC.

## Status algorytmów

- [x] **Ciąg Fibonacciego** (`fibonacci.arnoldc`)
- [x] Największy Wspólny Dzielnik (NWD)
- [x] Sprawdzanie liczby pierwszej
- [x] Rozkład na czynniki pierwsze
- [x] Silnia

## Instrukcja uruchomienia

Do kompilacji i uruchomienia programów napisanych w ArnoldC wymagane jest środowisko uruchomieniowe Java (JRE/JDK).

1. Pobierz plik kompilatora `ArnoldC.jar`.
2. Skompiluj kod źródłowy do pliku `.class`:
   ```bash
   java -jar ArnoldC.jar "Nazwa Pliku".arnoldc
   ```
3. Uruchom wygenerowany program:
   ```bash
   java "Nazwa Pliku"
   ```

---

<a name="english-version"></a>
# ArnoldC

## Overview

ArnoldC is an esoteric programming language where standard keywords are replaced with iconic one-liners from Arnold Schwarzenegger movies. Program execution begins with `IT'S SHOWTIME` and terminates with `YOU HAVE BEEN TERMINATED`.

* [ArnoldC](http://lhartikk.github.io/ArnoldC) - More information about ArnoldC.

## Algorithm Status

- [x] **Fibonacci sequence** (`fibonacci.arnoldc`)
- [x] Greatest Common Divisor (GCD)
- [x] Prime number check
- [x] Prime factorization
- [x] Factorial

## Execution Guide

Java Runtime Environment (JRE/JDK) is required to compile and run ArnoldC code.

1. Download the `ArnoldC.jar` compiler.
2. Compile the source code into a `.class` file:
   ```bash
   java -jar ArnoldC.jar "File Name".arnoldc
   ```
3. Execute the compiled program:
   ```bash
   java "File Name"
   ```