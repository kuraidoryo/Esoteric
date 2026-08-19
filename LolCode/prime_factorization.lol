HAI 1.2

HOW IZ I prime_factorization YR n

    DIFFRINT n AN SMALLR OF n AN 1
    O RLY?
        YA RLY
        I HAS A dummy
        IM IN YR extract2s UPPIN YR dummy WILE BOTH SAEM MOD OF n AN 2 AN 0
            VISIBLE "2 " !
            n R QUOSHUNT OF n AN 2
        IM OUTTA YR extract2s

        I HAS A i
        i R 3

        IM IN YR outerloop UPPIN YR dummy WILE BOTH SAEM PRODUKT OF i AN i AN SMALLR OF PRODUKT OF i AN i AN n
            IM IN YR innerloop UPPIN YR dummy WILE BOTH SAEM MOD OF n AN i AN 0
                VISIBLE i !
                VISIBLE " " !
                n R QUOSHUNT OF n AN i
            IM OUTTA YR innerloop
            i R SUM OF i AN 2
        IM OUTTA YR outerloop

        DIFFRINT n AN SMALLR OF n AN 1
        O RLY?
            YA RLY
            VISIBLE n !
            VISIBLE " " !
        OIC

    OIC
IF U SAY SO

I HAS A num
GIMMEH num
num IS NOW A NUMBR

I IZ prime_factorization YR num MKAY

KTHXBYE