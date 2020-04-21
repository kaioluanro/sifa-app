module.exports={
  download(request, response){
    const file = 'src/csv/file.xlsx'
    // response.status(200).send({msg:'download realizado com sucesso!!'})
    response.download(file);
  }
}