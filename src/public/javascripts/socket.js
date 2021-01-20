var socket = io('//localhost:10004');
socket.on('userLogin', function (data) {
    console.log('userLogin', data);
});
socket.on('userLogout', function (data) {
    console.log('userLogout', data);
});