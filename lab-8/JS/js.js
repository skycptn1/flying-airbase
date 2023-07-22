$(document).ready(function () {
    // One-click event
    $("#oneClickBox").click(function () {
        alert("You clicked the box once!");
    });

    // Double-click event
    $("#doubleClickBox").dblclick(function () {
        alert("You double-clicked the box!");
    });

    // On-hover event
    $("#hoverBox").hover(
        function () {
            $(this).css("background-color", "pink");
        },
        function () {
            $(this).css("background-color", "lightblue");
        }
    );
});