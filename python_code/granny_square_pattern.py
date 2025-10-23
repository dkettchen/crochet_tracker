def granny_square(rounds:int) -> list[str]:
    """
    creates a list of stitches as used in a granny square pattern

    takes the number of rounds desired

    returns the list of stitch names
    """

    pattern = []
    connector_counter = 0

    for round in range(rounds):
        if round == 0: # first round is 4 chains
            for _ in range(4):
                pattern.append("chain")
        else: # every subsequent round
            # connect/prep round
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

                # extras if any
                for _ in range(connector_counter):
                    for _ in range(3):
                        pattern.append("double")
                    pattern.append("chain")

                # last one of side
                if side == 3: # last side only needs 2
                    for _ in range(2):
                        pattern.append("double")
                else: # any other side gets 3
                    for _ in range(3):
                        pattern.append("double")
            
            # increment counter of how many connector chains we have for next round
            connector_counter += 1

            # connect
            pattern.append("slip stitch")

    # return finished pattern
    return pattern


if __name__ == "__main__":
    print(granny_square(2))

# TODO 

# general tasks/features to implement
# - translate this logic to js for ease of UI later ✅
    # - learn how to write js code tests
# - generate visuals for given pattern's stitches as svg
    # - go through generated pattern list w maybe a case argument to identify which pattern it is
    # - create, choose & transform relevant stitch visuals accordingly to compile a svg pattern
# - UI that goes through stitches in order & colour codes where you're at

# extension tasks: 
# - which previous stitch relevant stitches need to connect to?
# - other base patterns & vis