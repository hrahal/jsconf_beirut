function three () {
    throw new Error("DAMN!");
};

function two () {
    three();    
}

function one () {
    two();
}

one();
