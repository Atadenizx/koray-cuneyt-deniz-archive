import supabse from "./supabase";

export async function getPosters (){
  const { data: posters, error } = await supabse.from('posters').select('*')

if(error){
  console.log(error.message)
}


return posters
}
