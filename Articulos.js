var UrlGetArticulos = 'http://localhost:90/G2_19/API-G2_19/controller/articulos.php?op=GETarticulos';
var UrlPostArticulos = 'http://localhost:90/G2_19/API-G2_19/controller/articulos.php?op=Insertarticulos';
var UrlGetUno = 'http://localhost:90/G2_19/API-G2_19/controller/articulos.php?op=GetUno';
var UrlUpdateArticulos = 'http://localhost:90/G2_19/API-G2_19/controller/articulos.php?op=UpdateArticulo';
var UrlDeleteArticulo='http://localhost:90/G2_19/API-G2_19/controller/articulos.php?op=DeleteArticulo';

$(document).ready(function () {
    CargarArticulos();
});


function CargarArticulos() {
    $.ajax({
        url: UrlGetArticulos,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var MiItems = response;
            var Valores = '';


            for (i = 0; i < MiItems.length; i++) {
                Valores += '<tr>' +
                    '<td>' + MiItems[i].ID + '</td>' +
                    '<td>' + MiItems[i].DESCRIPCION + '</td>' +
                    '<td>' + MiItems[i].UNIDAD + '</td>' +
                    '<td>' + MiItems[i].COSTO + '</td>' +
                    '<td>' + MiItems[i].PRECIO + '</td>' +
                    '<td>' + MiItems[i].APLICA_ISV + '</td>' +
                    '<td>' + MiItems[i].PORCENTAJE_ISV + '</td>' +
                    '<td>' + MiItems[i].ESTADO + '</td>' +
                    '<td>' + MiItems[i].ID_SOCIO + '</td>' +
                    '<td>' +
                    '<button class="btn btn-warning" onclick="CargarArticulo(' + MiItems[i].ID + ')">Editar</button>' +
                    '<button class="btn btn-danger" onclick="EliminarArticulo(' + MiItems[i].ID + ')">Eliminar</button>' +
                    '<td>' +
                    '</tr>';
                $('.articulos').html(Valores);
            }
        }


    });
}

function AgregarArticulo() {
    var datosarticulos = {
        DESCRIPCION: $('#descripcion').val(),
        UNIDAD: $('#unidad').val(),
        COSTO: $('#costo').val(),
        PRECIO: $('#precio').val(),
        APLICA_ISV: $('#aplicaisv').val(),
        PORCENTAJE_ISV: $('#porcentajeisv').val(),
        ESTADO: $('#estado').val(),
        ID_SOCIO: $('#idsocio').val(),
    };
    var datosarticulosjson = JSON.stringify(datosarticulos);

    $.ajax({
        url: UrlPostArticulos,
        type: 'POST',
        data: datosarticulosjson,
        datatype: 'JSON',
        contentType: 'aplication/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert('Articulo Agregado');
}



function ActualizarArticulo(idarticulo) {
    var datosarticulo = {
        ID: idarticulo,
        DESCRIPCION: $('#descripcion').val(),
        UNIDAD: $('#unidad').val(),
        COSTO: $('#costo').val(),
        PRECIO: $('#precio').val(),
        APLICA_ISV: $('#aplicaisv').val(),
        PORCENTAJE_ISV: $('#porcentajeisv').val(),
        ESTADO: $('#estado').val(),
        ID_SOCIO: $('#idsocio').val(),
    };
    var datosarticulojson = JSON.stringify(datosarticulo);
    $.ajax({
        url: UrlUpdateArticulos,
        type: 'PUT',
        data: datosarticulojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }

    });
    alert("Articulo Actualizado")
}
function CargarArticulo(idarticulo) {
    var datosarticulo = {
        ID: idarticulo
    };
    var datosarticulojson = JSON.stringify(datosarticulo);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datosarticulojson,
        datatype: 'JSON',
        contentType: 'aplication/json',
        success: function (response) {
            var MiItems = response;
            $('#descripcion').val(MiItems[0].DESCRIPCION);
            $('#unidad').val(MiItems[0].UNIDAD);
            $('#costo').val(MiItems[0].COSTO);
            $('#precio').val(MiItems[0].PRECIO);
            $('#aplicaisv').val(MiItems[0].APLICA_ISV);
            $('#porcentajeisv').val(MiItems[0].PORCENTAJE_ISV);
            $('#estado').val(MiItems[0].ESTADO);
            $('#idsocio').val(MiItems[0].ID_SOCIO);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarArticulo(' + MiItems[0].ID + ')" value="Actualizar Articulo" class="btn btn-primary"></input>';
            $('.button').html(btnactualizar);

        }
    });



}
function EliminarArticulo(idarticulo) {
        var datosarticulo = {
            ID: idarticulo
        };
        var datosarticulojson = JSON.stringify(datosarticulo);


        $.ajax({
            url: UrlDeleteArticulo,
            type: 'DELETE',
            data: datosarticulojson,
            datatype: 'JSON',
            contentType: 'application/json',
            success: function (response) {
                console.log(response);
            }
    
        });
        alert("Articulo Eliminado")
}



