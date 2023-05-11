$('#userEditDialog').on('shown.bs.modal', function (event) {
    let button = $(event.relatedTarget) // Button that triggered the modal
    let userId = button.data('userid') // Extract info from data-* attributes
    let action = button.data('action')


    if (userId) {
        $.get({
            url: '/api/v1/user/' + userId,
            success: (data) => {
                let modal = $(this)
                if (action == "Delete") {
                    modal.find('#exampleModalLabel').text("Delete user")
                    modal.find('#user-firstname').attr('disabled', true)
                    modal.find('#user-lastname').attr('disabled', true)
                    modal.find('#user-age').attr('disabled', true)
                    modal.find('#user-email').attr('disabled', true)
                    modal.find('#user-password').attr('disabled', true)
                    modal.find('#select-role').attr('disabled', true)
                    modal.find('#save-user-button').attr('class', "btn btn-danger")
                    modal.find('#save-user-button').text("Delete")

                } else {
                    modal.find('#exampleModalLabel').text("Edit user")
                    modal.find('#user-firstname').attr('disabled', false)
                    modal.find('#user-lastname').attr('disabled', false)
                    modal.find('#user-age').attr('disabled', false)
                    modal.find('#user-email').attr('disabled', false)
                    modal.find('#user-password').attr('disabled', false)
                    modal.find('#select-role').attr('disabled', false)
                    modal.find('#save-user-button').attr('class', "btn btn-info")
                    modal.find('#save-user-button').text("Edit")
                }
                modal.find('#user-id').val(data.id)
                modal.find('#user-firstname').val(data.firstName)
                modal.find('#user-lastname').val(data.lastName)
                modal.find('#user-age').val(data.age)
                modal.find('#user-email').val(data.email)
                modal.find('#user-password').val(data.password)

            },
            error: (err) => {
                alert(err);
            }
        });
    }
})
$('#save-user-button').click(function () {

    let modal = $('#userEditDialog')
    let action = modal.find('#save-user-button').text()
    let userTable = document.getElementById('tabel_user');
    let id = modal.find('#user-id').val()
    let userRow = document.getElementById('user-' + id);

    if (action == "Delete") {


        $.ajax({
            url: '/api/v1/user/' + id,
            type: 'DELETE',


            success: () => {


                if (userRow) {
                    userTable.deleteRow(userRow.rowIndex);
                    console.log('Пользователь успешно удален');
                } else {
                    console.log('Пользователь не найден');
                }

            },
            error: (err) => {
                alert(err);

            }

        })


    }
    if (action == "Edit") {
        let collection = [];
        let rol
        let test = []
        test = modal.find("#select-role").val()
        for (let i = 0; i < test.length; i++) {
            collection.push(rol = {
                id: test[i]

            })
        }
        console.log(modal.find("#select-role").val())
        console.log(collection)
        let user = {

            id: modal.find('#user-id').val(),
            firstName: modal.find('#user-firstname').val(),
            lastName: modal.find('#user-lastname').val(),
            age: modal.find('#user-age').val(),
            email: modal.find('#user-email').val(),
            password: modal.find('#user-password').val(),
            roles: collection
        };

        if (modal.find('#user-id').val()) {
            user.id = modal.find('#user-id').val()
        }
        $.ajax({
            url: '/api/v1/user',
            type: 'POST',
            data: JSON.stringify(user),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: () => {
                $.get({
                    url: '/api/v1/user/' + id,
                    success: (data) => {
                        let userName = document.getElementById('userFirstName-' + id)
                        console.log(userName);
                        userName.textContent = data.firstName
                        let userLastName = document.getElementById('userLastName-' + id)
                        userLastName.textContent = data.lastName
                        let userAge = document.getElementById('userAge-' + id)
                        userAge.textContent = data.age
                        let userEmail = document.getElementById('userEmail-' + id)
                        userEmail.textContent = data.email
                        let userRoles = document.getElementById('userRoles-' + id)
                        let userRole = data.roles
                        userRoles.innerText="["
                        const shortenedNames = userRole.map(role => role.name);
                        userRoles.innerText += shortenedNames.join(', ');
                        userRoles.innerText+="]"

                    }});
                        // location.reload()
                    }
                    ,
                    error: (err) => {
                        alert(err);

                    }

                })
            }

        })

        $('#save-user-button2').click(function () {
            let newUser = $('#profile-tab-pane')
            let collection = [];
            let rol
            let test = []
            test = newUser.find("#select-role2").val()
            for (let i = 0; i < test.length; i++) {
                collection.push(rol = {
                    id: test[i]

                })
            }


            let user = {

                firstName: newUser.find('#firstName').val(),
                lastName: newUser.find('#lastName').val(),
                age: newUser.find('#age').val(),
                email: newUser.find('#email').val(),
                password: newUser.find('#password').val(),
                roles: collection
            };


            $.ajax({
                url: '/api/v1/user',
                type: 'POST',
                data: JSON.stringify(user),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: () => {
                    location.reload()
                },
                error: (err) => {
                    alert(err);

                }
            })


        })
