class InicializationArr
{
    static width = 20;
    static heigth = 20;
    static arr = [] ;

    static BuildArr()
    {
        this.arr=[];
        for (let i = 0; i < this.heigth; i++)
        {
            let locItem = []
            for (let j = 0; j < this.width; j++)
            {
                locItem.push();
            }
            this.arr.push(locItem)
        }  

        for (let i = 0; i < this.heigth; i++)
        {
            for (let j = 0; j < this.width; j++)
            {
                this.arr[i][j] = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
            }
        }
        return this.arr;
    }
}

class ModernArr
{
    static width = InicializationArr.width;
    static heigth = InicializationArr.heigth;
    static arr;
    static strArr=[] ;
    static count;
    static countMin = 4;
    static localArr; // массив с хранением ячеек по которым мы прошли во время шага относительно одной клитки
    static nextArr; // массив всего пройденых клеток за все ходы
    static minValue = 3;
    static maxValue = 3;
    static flag = false;
    static allClusters = [];

    static CheckList(i, j, arr)
    {
        for ( let k = 0; k < arr.length; k++)
        {
            if (arr[k][0] == i && arr[k][1] == j) return false;
        }
        return true;            
    }
    
    static BuildArr()
    {
        
        for (let i = 0; i < this.heigth; i++)
        {
            let locItem = []
            for (let j = 0; j < this.width; j++)
            {
                locItem.push(this.arr[i][j]);
            }
            this.strArr.push(locItem)
        }
    }

    static Check( i,  j)
    {
        try { if (this.arr[i][ j + 1] == this.arr[i][ j] && this.CheckList(i, j + 1, this.localArr) && this.CheckList(i, j + 1, this.nextArr)) { 
                this.localArr.push([i, j + 1]); this.count++; this.Check(i, j + 1); 
            } 
        } catch (Exception) { }
        try { if (this.arr[i + 1][ j] == this.arr[i][ j] && this.CheckList(i + 1, j, this.localArr) && this.CheckList(i + 1, j, this.nextArr)) { 
                this.localArr.push([ i + 1, j ]); this.count++; this.Check(i + 1, j); 
            } 
        } catch (Exception) { }
        try { if (this.arr[i][ j - 1] == this.arr[i][ j] && this.CheckList(i, j - 1, this.localArr) && this.CheckList(i, j - 1, this.nextArr)) { 
                this.localArr.push([i, j - 1]); this.count++; this.Check(i, j - 1); 
            } 
        } catch (Exception) { }
        try { if (this.arr[i - 1][ j] == this.arr[i][ j] && this.CheckList(i - 1, j, this.localArr) && this.CheckList(i - 1, j, this.nextArr)) { 
                this.localArr.push([ i - 1, j ]); this.count++; this.Check(i - 1, j); 
            } 
        } catch (Exception) { }
    }

    static AllClusters(){
        return this.allClusters
    }

    static  ModernArr()
    {
        this.flag = false
        for (let i = 0; i < this.heigth; i++)
        {
            for (let j = 0; j < this.width; j++)
            {
                if (!this.CheckList(i,j,this.nextArr)) continue;
                this.count = 1;
                this.localArr = [];
                this.localArr.push([ i, j ]);
                this.Check(i, j);
                if (this.count >= this.countMin)
                {
                    this.allClusters.push(this.localArr)
                    this.flag = true;
                    for (let k = 0; k < this.localArr.length; k++)
                    {
                        this.strArr[this.localArr[k][0]][ this.localArr[k][1]] = '' ;
                        this.nextArr.push([ this.localArr[k][0], this.localArr[k][1]]);
                    }
                }
                else
                {
                    this.nextArr.push([ i, j ]);
                }
            }
        }

    }

    static Main()
    {
        this.arr = InicializationArr.arr;
        this.localArr = [];
        this.nextArr = [];
        this.strArr = [];
        this.BuildArr();
        this.ModernArr();
        return this.strArr;
    }
}

class BuildArea{
    static width = InicializationArr.width;
    static heigth = InicializationArr.heigth;

    static BuildArea()
    {
        for(let i = 0; i < this.heigth; i++)
        {
            let div = document.createElement('div');
            div.id = `${i}`;
            div.className = 'area-column';
            document.getElementById("area").append(div);
            for(let j = 0; j < this.width; j++)
            {
                let childDiv = document.createElement('div');
                childDiv.id = `${i+'.'+j}`;
                childDiv.className = "area-cell";
                document.getElementById(div.id).append(childDiv);
            }
        }
    }
}

class ShowArr
{
    static arr;
    static width = InicializationArr.width;
    static heigth = InicializationArr.heigth;
    
    static ShowArr(arr)
    {
        this.arr = arr;
        for(let i = 0; i < this.heigth; i++)
        {
            for(let j = 0; j < this.width; j++)
            {
                document.getElementById(`${i+'.'+j}`).innerHTML = this.arr[i][j];
            }
        }
    }
}

class ShowNewArr
{
    static newArr;
    static width = InicializationArr.width;
    static heigth = InicializationArr.heigth;

    static ShowArr()
    {
        this.newArr = ModernArr.Main();
        for(let i = 0; i < this.heigth; i++)
        {
            for(let j = 0; j < this.width; j++)
            {
                document.getElementById(`${i+'.'+j}`).innerHTML = this.newArr[i][j];
            }
        }
    }
}

class BackArr
{
    static arr;
    static width = InicializationArr.width;
    static heigth = InicializationArr.heigth;
    
    static ShowArr()
    {
        this.arr = InicializationArr.arr;
        for(let i = 0; i < this.heigth; i++)
        {
            for(let j = 0; j < this.width; j++)
            {
                document.getElementById(`${i+'.'+j}`).innerHTML = this.arr[i][j];
            }
        }
    }
}

class CellsDown
{
    static arr;
    static width = InicializationArr.width;
    static heigth = InicializationArr.heigth;

    static BuildArr()
    {
        this.arr = ModernArr.strArr;        
        for(let i = 0; i < this.heigth; i++)
        {
            let countEmpty = 0
            for(let j = 0; j < this.width; j++)
            {   
                if(this.arr[i][j] === '') {this.arr[i].splice(j,1) ;j--; countEmpty++}
            }
            for(let j = 0; j < countEmpty; j++)
            {   
                this.arr[i].unshift('')
            }
        }
    }

    static ShowArr()
    {
        for(let i = 0; i < this.heigth; i++)
        {
            for(let j = 0; j < this.width; j++)
            {
                document.getElementById(`${i+'.'+j}`).innerHTML = this.arr[i][j];
            }
        }
    }

    static CellsDown()
    {
        this.BuildArr();
        this.ShowArr();
    }
}

class AddNewCells
{
    static arr;
    static width = InicializationArr.width;
    static heigth = InicializationArr.heigth;

    static AddNewCells()
    {
        this.arr = CellsDown.arr;
        for(let i = 0; i < this.heigth; i++)
        {
            for(let j = 0; j < this.width; j++)
            {
                if(this.arr[i][j] === '') this.arr[i][j] = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
            }
        }
        InicializationArr.arr = this.arr;
        return this.arr
    }
}

class Main{
    static time = 1000;
    static Main()
    {
        BuildArea.BuildArea();
        ShowArr.ShowArr(InicializationArr.BuildArr());

        function sleep(ms) {
            return new Promise(resolve => setInterval(resolve, ms));
        }
        setTimeout(async function run() {
            ShowNewArr.ShowArr()
            if(ModernArr.flag == false){
                ShowArr.ShowArr(InicializationArr.BuildArr());
                setTimeout(run, Main.time);
                return
            }
            await sleep(Main.time);
            CellsDown.CellsDown()
            await sleep(Main.time);
            ShowArr.ShowArr(AddNewCells.AddNewCells())
            setTimeout(run, Main.time);
        }, Main.time);
    }
}

Main.Main()



