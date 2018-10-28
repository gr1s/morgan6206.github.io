var result = [];
var selectedRow_1 = [], selectedRow_2 = [], selectedRow_3 = [];//выбранные значения по 3 таблицам
var countAV_0=0, countEO_0=0, countVV_0=0, countSV_0=0, countOV_0=0;//подсчет значений для 1 таблицы
var countAV_1=0, countEO_1=0, countVV_1=0, countSV_1=0, countOV_1=0;//2 таблицы
var countAV_2=0, countEO_2=0, countVV_2=0, countSV_2=0, countOV_2=0;//3 таблицы
var AV=[1,2,4,5,18];//порядковый номер показателя в таблице
var EO=[3,6,10,11,21];
var VV=[0,8,12,13,19];
var SV=[7,9,15,23,24];
var OV=[14,16,17,20,22];

function createTable(){
    var data = JSON.parse(dataJson); //достаем данные таблицы
    $('#table1').html(fillTable(0,data)); //заполняем таблицы
    $('#table2').html(fillTable(1,data)); 
    $('#table3').html(fillTable(2,data));
}

function fillTable(tableNumber, data){
    var table = '<table class="table table-bordered">';
    for(var i=0; i<25; i++)
        {
            table += '<tr>';
            table +='<td>'+data.table[i][0]+'</td>';  
            table +='<td><button type="button" class="btn btn-default" onclick="countValues('+tableNumber+','+i+',3, this)">3</button></td>';
            table +='<td><button type="button" class="btn btn-default" onclick="countValues('+tableNumber+','+i+',2, this)">2</button></td>';
            table +='<td><button type="button" class="btn btn-default" onclick="countValues('+tableNumber+','+i+',1, this)">1</button></td>';
            table +='<td><button type="button" class="btn btn-default" onclick="countValues('+tableNumber+','+i+',-1, this)">1</button></td>';
            table +='<td><button type="button" class="btn btn-default" onclick="countValues('+tableNumber+','+i+',-2, this)">2</button></td>';
            table +='<td><button type="button" class="btn btn-default" onclick="countValues('+tableNumber+','+i+',-3, this)">3</button></td>';
            table +='<td>'+data.table[i][1]+'</td>';
            table += '</tr>';
        }
    table +='</table>';
    return table;
}

function countValues(tableNumber, serialNumber, value, button){
    //serialNumber - порядковый номер строки-критерия
    switch (tableNumber) {
        case 0:
            console.log('table 1');
            countValuesInTables(selectedRow_1, serialNumber, value, tableNumber, button);
            break;
        case 1:
            console.log('table 2');
            countValuesInTables(selectedRow_2, serialNumber, value, tableNumber, button)
            break;
        case 2:
            console.log('table 3');
            countValuesInTables(selectedRow_3, serialNumber, value, tableNumber, button)
            break;
        default:
          console.log('unknown table number - '+ tableNumber);
      }
}

//считаем критерий для таблицы если он еще не выбран
function countValuesInTables(selectedRow, serialNumber, value, tableNumber, button){
    if(checkCriterion(selectedRow, serialNumber) == false){//проверяем был ли уже выбран критерий, если нет, то:
        selectedRow.push(serialNumber);
        $(button).removeClass("btn btn-default").addClass("btn btn-success");
        for(var i=0; i<AV.length; i++){//запускаем цикл по критериям и смотрим к какому показателю относится критерий
            if(serialNumber == AV[i]){
                countInTable(tableNumber, 0, value);
            }
            if(serialNumber == EO[i]){
                countInTable(tableNumber, 1, value);
            }
            if(serialNumber == VV[i]){
                countInTable(tableNumber, 2, value);
            }
            if(serialNumber == SV[i]){
                countInTable(tableNumber, 3, value);
            }
            if(serialNumber == OV[i]){
                countInTable(tableNumber, 4, value);
            }
        }
    }
    else{
        console.log('criterian repeat choise: '+serialNumber+'; with val: '+value);
    }
}

//проверяем был ли уже выбран критерий, для каждой таблицы (selectedRow)
function checkCriterion(selectedRow, serialNumber){
    var exists = false;//изначально критерий не выбран
    for(var i=0; i<selectedRow.length; i++){
        if(serialNumber == selectedRow[i]){//если критерий уже есть в выбранных, то он выбран
            exists=true;//меняем флаг на "выбран"
            break;//останавливаем цикл
        }
        else continue;//если нет, то переходим к следующему критерию
    }
    return exists;
}

//Подсчитываем критерии напрямую для таблицы
function countInTable(tableNumber, criterianNumber, value){
    if(tableNumber == 0){
        if(criterianNumber == 0){//AV
            countAV_0 +=value;
        }
        if(criterianNumber == 1){//EO
            countEO_0 +=value;
        }
        if(criterianNumber == 2){//VV
            countVV_0 +=value;
        }
        if(criterianNumber == 3){//SV
            countSV_0 +=value;
        }
        if(criterianNumber == 4){//OV
            countOV_0 +=value;
        }
    }
    if(tableNumber == 1){
        if(criterianNumber == 0){//AV
            countAV_1 +=value;
        }
        if(criterianNumber == 1){//EO
            countEO_1 +=value;
        }
        if(criterianNumber == 2){//VV
            countVV_1 +=value;
        }
        if(criterianNumber == 3){//SV
            countSV_1 +=value;
        }
        if(criterianNumber == 4){//OV
            countOV_1 +=value;
        }
    }
    if(tableNumber == 2){
        if(criterianNumber == 0){//AV
            countAV_2 +=value;
        }
        if(criterianNumber == 1){//EO
            countEO_2 +=value;
        }
        if(criterianNumber == 2){//VV
            countVV_2 +=value;
        }
        if(criterianNumber == 3){//SV
            countSV_2 +=value;
        }
        if(criterianNumber == 4){//OV
            countOV_2 +=value;
        }
    }
}


function getResult(){
    console.log(selectedRow_1);
    console.log(selectedRow_2);
    console.log(selectedRow_3);
    console.log('table1; AV='+countAV_0+'; EO='+countEO_0+'; VV='+countVV_0+'; SV='+countSV_0+'; OV='+countOV_0);
    console.log('table2; AV='+countAV_1+'; EO='+countEO_1+'; VV='+countVV_1+'; SV='+countSV_1+'; OV='+countOV_1);
    console.log('table3; AV='+countAV_2+'; EO='+countEO_2+'; VV='+countVV_2+'; SV='+countSV_2+'; OV='+countOV_2);
    var sum_1 = countAV_0+countEO_0+countVV_0+countSV_0+countOV_0;
    var sum_2 = countAV_1+countEO_1+countVV_1+countSV_1+countOV_1;
    var sum_3 = countAV_2+countEO_2+countVV_2+countSV_2+countOV_2;
    var resultView = '<h3>Результат</h3>';
    resultView += '<table class="table"><thead><tr><th scope="col">#</th>';
    resultView +='<th scope="col">Настоящее</th><th scope="col">Прошлое</th><th scope="col">Будущее</th></tr></thead><tbody>'
    resultView +='<tr><th scope="row">АВ</th><td>'+countAV_0+'</td><td>'+countAV_1+'</td><td>'+countAV_2+'</td></tr>';  
    resultView +='<tr><th scope="row">ЭО</th><td>'+countEO_0+'</td><td>'+countEO_1+'</td><td>'+countEO_2+'</td></tr>';
    resultView +='<tr><th scope="row">ВВ</th><td>'+countVV_0+'</td><td>'+countVV_1+'</td><td>'+countVV_2+'</td></tr>';
    resultView +='<tr><th scope="row">СВ</th><td>'+countSV_0+'</td><td>'+countSV_1+'</td><td>'+countSV_2+'</td></tr>';
    resultView +='<tr><th scope="row">ОВ</th><td>'+countOV_0+'</td><td>'+countOV_1+'</td><td>'+countOV_2+'</td></tr>';
    resultView +='<tr><th scope="row">Сумма</th><td>'+sum_1+'</td><td>'+sum_2+'</td><td>'+sum_3+'</td></tr>';
    resultView += '</tbody></table>';
    $('#result').html(resultView); 
}