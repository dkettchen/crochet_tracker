from python_code.granny_square_pattern import granny_square

def test_does_not_mutate_input():
    rounds = 3
    granny_square(rounds)
    assert rounds == 3
def test_returns_list():
    pattern = granny_square(3)
    assert type(pattern) == list
def test_returns_list_of_strings():
    pattern = granny_square(3)
    for item in pattern:
        assert type(item) == str
def test_all_strings_are_crochet_stitch_names():
    pattern = granny_square(3)
    for item in pattern:
        assert item in ["chain", "slip stitch", "double"]

def test_for_single_round_returns_four_chains():
    pattern = granny_square(1)
    assert pattern == ["chain", "chain", "chain", "chain", ]
def test_for_2_rounds_returns_first_round_of_granny_square():
    pattern = granny_square(2)
    assert pattern == [
        "chain", "chain", "chain", "chain", 
        "slip stitch", "chain", "chain", "chain", 
        "chain", "chain", 
        "double", "double", "double",
        "chain", "chain", 
        "double", "double", "double",
        "chain", "chain", 
        "double", "double", "double",
        "chain", "chain", 
        "double", "double", 
        "slip stitch", 
    ]
# def test_for_3_rounds_returns_appropriately_increasing_rounds_of_granny_square():
#     pass
# def test_for_4_rounds_returns_appropriately_increasing_rounds_of_granny_square():
#     pass