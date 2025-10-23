from copy import deepcopy

chain={
    "stitch":"chain",
}
double = {
    "stitch": "double",
}

starting_circle = [chain, chain, chain, chain]
double_replacement = [chain, chain, chain]
corner = [chain, chain]
three_doubles = [double, double, double]
filler_doubles = [double, double]


def granny_square(rounds:int):

    # TODO first make it so we have all the stitches in order, worry abt the connections later

    pattern = []
    connector_counter = 0

    for round in range(rounds):
        if round == 0:
            for _ in range(4):
                pattern.append("chain")
        else:
            # connect
            pattern.append("slip stitch")

            # 3 chains to replace the first double
            for _ in range(3):
                pattern.append("chain")

            # for each side
            for side in range(4):

                # add corner chains
                for _ in range(2):
                    pattern.append("chain")
                
                # add doubles
                if side == 3: # last side only needs 2
                    for _ in range(2):
                        pattern.append("double")
                else: # any other side gets 3
                    for _ in range(3):
                        pattern.append("double")
            


    return pattern