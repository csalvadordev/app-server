const express 		= require('express');
const bodyParser 	= require('body-parser');
const bcrypt 		= require('bcrypt-nodejs');
const cors 			= require('cors');

const all 			= require('promise-all-map');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(cors());

app.listen(3001);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

	// DB CONNECTION //
const knex = require('knex');

const dbConnection = knex({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'qrestaurant'
  }
});

	/// CALENDAR FETCH DATES ///

app.get('/calendar/fetch/', (req, res) => {
	//console.log(req.body);
	dbConnection.select('nome_projeto', 'status', 'data_termino').from('projects_services').then( data => {
		return data;
	}).then( data => {
			res.send(data);
		}
	)
	.catch(err => res.sendStatus(404).json(err))
});

	/// REGISTER USER ///
app.post('/user/register', (req, res) => {
	//console.log(req.body);
	const { name, email, password, data_nasc, isAcceptedTerms } = req.body;

	//for (var i = 0; i <= 20; i++) {
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(password, salt, null, function(err, hash) {
			    // Store hash in your password DB.
			    	dbConnection('users')
					.returning('*')
					.insert({
						name: name,
						email: email,
						password: hash,
						data_nasc: data_nasc,
            isAcceptedTerms: isAcceptedTerms,
						joined: new Date()
					}).then( user => {
						res.json(user);
            console.log("This is the PASSWORD", user);
					})
					.catch(err => res.sendStatus(404).json(err))
			});
		})
	//}
});

	/// USER EDIT ///

app.put('/user/edit', (req, res) => {
	//console.log(req.body);
	const { id, name, email, password, funcao, permissao } = req.body;
	//const corpo = req.body;
	//res.send(corpo);

	dbConnection('users')
	.returning('*')
	.update({
		name: name,
		email: email,
		//password: password,
		funcao: funcao,
		permissao: permissao,
		//joined: new Date()
	}).where('id', id)
	.then( user => {
		res.sendStatus(200).res.send("Success");
	})
	//.catch(err => res.sendStatus(404).send("Bad Request"))
	.catch(err => res.sendStatus(404).json(err))

});

	/// SELECT ALL USERS ///

app.post('/user/signin/', (req, res) => {

	const { email, password } = req.body;

	console.log(email)
	dbConnection.select('*').from('users').where('email', email).then( data => {
			// Load hash from your password DB.

		if( data.length !== 0 ){
			bcrypt.compare(password, data[0].password, function(err, response){
				//console.log("This is the PASSWORD OF BD", data[0].password);
				if ( response ){
					res.json(data);
				}
				else res.send("false");
			})
		} else {
			res.send(false)
		}
	})

});

app.post('/user/signinByEmail/', (req, res) => {

	const { email } = req.body;

	dbConnection.select('*').from('users').where('email', email).then( data => {
			// Load hash from your password DB.

		if( data.length !== 0 ){
			res.json(data);
		} else {
			res.send(false)
		}
	})

});

app.post('/user/signin/ByID', (req, res) => {

	const { id } = req.body;

	dbConnection.select('*').from('users').where('id', id).then( data => {
			// Load hash from your password DB.

		if( data.length !== 0 ){
			res.json(data);
      console.log('SINGIN BY ID', data)
		} else {
			res.send(false)
		}
	})

});

	/// SELECT ALL USERS ///

app.get('/user/fetch/', (req, res) => {
	//console.log(req.query.user);
	//console.log(req.header);
	//console.log(req.body);
	//console.log(req.params);
	dbConnection.select('*').from('users').then( data => {
		return data;
	}).then( data => {
			res.send(data);
		}
	)
	//res.sendStatus(404).send("not found");
});

	/// SELECT USER BY ID ///

app.get('/user/fetch/byId/:id', (req, res) => {

	dbConnection.select('*').from('users').where('id', req.params.id).then( data => {
		return data;
	}).then( data => {
			res.json(data);
		}
	)
	//res.sendStatus(404).send("not found");
});

	/// SELECT USER BY EMAIL ///
app.get('/user/fetch/byEmail/:email', (req, res) => {

	dbConnection.select('*').from('users').where('email', req.params.email).then( data => {
		return data;
	}).then( data => {
			res.json(data);
		}
	)
});

	/// UPDATE USERS ///

app.put('/user/fetch/byId/:id', (req, res) => {

	dbConnection.select('*').from('users').where('id', req.params.id).then( data => {
		return data;
	}).then( data => {
			res.json(data);
		}
	)
});

app.post('/user-search/fetch/', (req, res) => {

	const { search } = req.body;

	dbConnection.select('*').from('users')
	.where('name', 'like', '%'+search+'%')
	.orWhere('funcao', 'like', '%'+search+'%')
	.orWhere('permissao', 'like', '%'+search+'%')/*.orWhere('email', 'like', '%client%')*/.then( data => {
		return data;
	}).then( data => {
			res.json(data);
		}
	)
	//res.sendStatus(200).send("not found");
});

app.post('/user-search/fetch/ByName', (req, res) => {

	const { search } = req.body;

	dbConnection.select('id', 'name').from('users')
	.where('name', 'like', '%'+search+'%')
	.limit(10)
	.then( data => {
		console.log(data)
		return data;
	}).then( data => {
			res.json(data);
		}
	)
	//res.sendStatus(200).send("not found");
});

/// REGISTER ORDER ///
app.post('/order/register', (req, res) => {
//console.log(req.body);cmdcmd
const { idRestaurant, restaurantName, orderlist, subTotal, idUser=0 } = req.body;
console.log("This is the SUBTOTAL = = ", req.body);
//for (var i = 0; i <= 20; i++) {

  //DISCOMENT AFTER
    // dbConnection('orders')
    // .returning('*')
    // .insert({
    //   idRestaurant: idRestaurant,
    //   restaurantName: restaurantName,
    //   idUser: idUser,
    //   orderlist: JSON.stringify(orderlist),
    //   subTotal: subTotal,
    //   isFinalized: '0',
    //   isPaid: '0',
    //   joined: new Date()
    // }).then( user => {
    //   res.json(user);
    //   console.log("This is the CART = = ", orderlist);
    // })
    // .catch(err => res.sendStatus(404).json(err))
    res.json([1])

//}
});

	/// REGISTER CLIENT ///
// app.post('/client/register', (req, res) => {
// 	const { name, email, cpf, telefone, sexo, data_nasc } = req.body;
//
// 	for (var i = 1; i <= 1; i++) {
// 		dbConnection('clients')
// 		.returning('*')
// 		.insert({
// 			nome: name/*+" Numero "+i*/,
// 			email: email,
// 			cpf: cpf,
// 			telefone: telefone,
// 			sexo: sexo,
// 			data_nasc: data_nasc,
// 			//joined: new Date()
// 		}).then( user => {
// 			res.send(user);
// 			/*res.status(404).send("Not Found");
// 			res.status(400).send("Bad Request");*/
// 		})
// 		.catch(err => res.send(err))
// 		//.catch(err => res.sendStatus(404).json(err))
// 	}
//
// });
//
// 		/// CLIENT EDIT ///
//
// app.put('/client/edit', (req, res) => {
// 	const { id, name, email, cpf, telefone, sexo, data_nasc } = req.body;
//
// 	dbConnection('clients')
// 	.returning('*')
// 	.update({
// 		nome: name,
// 		email: email,
// 		cpf: cpf,
// 		telefone: telefone,
// 		sexo: sexo,
// 		data_nasc: data_nasc,
// 		joined: new Date()
// 	}).where('id', id)
// 	.then( user => {
// 		console.log(res.statusCode)
// 		if(res.statusCode === 404){
// 			res.send("Bad Request");
// 		}
// 		else if(res.statusCode === 200 ){
// 			res.send(true);
// 		}
// 		else if(res.statusCode === 400 ){
// 			res.send(false);
// 		}
// 	})
// 	//.catch(err => res.sendStatus(404).send("Bad Request"))
// 	.catch(err => res.json(err))
//
// });
//
// 	/// CLIENT DELETE ///
//
// app.delete('/client/delete/', (req, res) => {
//
// 	const { id } = req.body;
//
// 	dbConnection.select('*').from('clients').where('id', id).delete().then( response => {
// 		//console.log(JSON.stringify(response[0].id));
// 		res.send(JSON.stringify(response));
// 	})
// 	//res.sendStatus(200).send("not found");
// });
//
// 	/// SELECT ALL CLIENTS ///
//
// app.get('/client/fetch/', (req, res) => {
//
// 	dbConnection.select('*').from('clients').then( data => {
// 		return data;
// 	}).then( data => {
// 			res.send(data);
// 			res.sendStatus(404).send("not found");
// 		}
// 	)
// });
//
// app.post('/client/fetch/byId/', (req, res) => {
//
// 	const { id } = req.body;
//
// 	dbConnection.select('*').from('clients').where('id', id).then( data => {
// 		return data;
// 	}).then( data => {
// 			res.json(data[0]);
// 		}
// 	)
// 	//res.sendStatus(200).send("not found");
// });
//
// app.get('/client/count/', (req, res) => {
// 	//console.log(req.query.user);
// 	//console.log(req.header);
// 	//console.log(req.params);
// 	dbConnection.select('id').from('clients').count('id as COUNT').then( function(total) {
// 		res.send(JSON.stringify(total[0].COUNT))
// 	})
// });
//
// app.post('/client-search/fetch/', (req, res) => {
//
// 	const { search } = req.body;
//
// 	dbConnection.select('*').from('clients').where('nome', 'like', '%'+search+'%')/*.orWhere('email', 'like', '%client%')*/.then( data => {
// 		return data;
// 	}).then( data => {
// 			res.json(data);
// 		}
// 	)
// 	//res.sendStatus(200).send("not found");
// });
//
// app.post('/client-search/fetch/ByName', (req, res) => {
//
// 	const { search } = req.body;
//
// 	dbConnection.select('id', 'nome').from('clients')
// 	.where('nome', 'like', '%'+search+'%')
// 	.limit(10)
// 	.then( data => {
// 		console.log(data)
// 		return data;
// 	}).then( data => {
// 			res.json(data);
// 		}
// 	)
// 	//res.sendStatus(200).send("not found");
// });
//
// 	///////////////////////// END CLIENT REQUESTS /////////////////////////
// 	///////////////////////////////////////////////////////////////////////
// 							/////////////////////////
//
// 	/// REGISTER NEW PROJECT //
// app.post('/project/register', (req, res) => {
//
// 	const { tipo, nome_projeto, responsavel, proprietario, data_inicio, data_termino, valor, formaPg, parcelas, descricao, observacoes } = req.body;
// 	const corpo = req.body;
//
// 	let num 		= Math.random() * 2;
// 	let projHash 	= num.toString(36).substr(2).toUpperCase();
// 	//console.log(projHash)
//
// 	for (var i = 0; i <= 15; i++) {
// 		    // Store hash in your password DB.
// 		dbConnection('projects_services')
// 		.returning('*')
// 		.insert({
// 			tipo: tipo,
// 			proj_Hash: projHash,
// 			nome_projeto: nome_projeto +" Numero "+i,
// 			proprietario: proprietario,
// 			responsavel: responsavel,
// 			data_inicio: data_inicio,
// 			data_termino: data_termino,
// 			valor: valor,
// 			formaPg: formaPg,
// 			parcelas: parcelas,
// 			descricao: descricao,
// 			observacoes: observacoes,
// 			status: "NÃO INICIADO",
// 			joined: new Date()
// 		}).then( user => {
// 			res.json(user);
// 		})
// 		//.catch(err => res.sendStatus(404).send("Bad Request"))
// 		.catch(err => res.json(err))
// 	}
//
// });
//
// 	/// PROJECT EDIT ///
//
// app.put('/project/edit', (req, res) => {
// 	//console.log(req.body);
// 	const { id, tipo, nome_projeto, proprietario, responsavel, data_inicio, data_termino, valor, formaPg, parcelas, descricao, observacoes } = req.body;
// 	//const corpo = req.body;
// 	//res.send(corpo);
//
// 	dbConnection('projects_services')
// 	.returning('*')
// 	.update({
// 		tipo: tipo,
// 		nome_projeto: nome_projeto,
// 		idCliente: proprietario,
// 		responsavel: responsavel,
// 		data_inicio: data_inicio,
// 		data_termino: data_termino,
// 		valor: valor,
// 		formaPagamento: formaPg,
// 		parcelas: parcelas,
// 		descricao: descricao,
// 		observacoes: observacoes,
// 		joined: new Date()
// 	}).where('id', id)
// 	.then( user => {
// 		if ( res.statusCode === 404 ) {
// 			res.send(404).res.send("Bad Request");
// 		}
// 		else if ( res.statusCode === 200 ) {
// 			res.send(200).res.send("Success");
// 		}
// 	})
// 	//.catch(err => res.sendStatus(404).send("Bad Request"))
// 	.catch(err => res.sendStatus(404).json(err))
//
// });
//
// 	///// PROJECT COUNT ///////
// app.get('/project/count/', (req, res) => {
// 	dbConnection.select('id').from('projects_services').count('id as COUNT').then( function(total) {
// 		res.send(JSON.stringify(total[0].COUNT))
// 	})
// });
//
// 	/// SELECT ALL PROJETCS ///
// app.get('/project/fetch/', (req, res) => {
// 	//console.log(req.query.user);
// 	//console.log(req.header);
// 	//console.log(req.params);
// 	dbConnection.select('*').from('projects_services').then( data => {
// 		return data;
// 	}).then( data => {
// 			res.send(data);
// 		}
// 	)
// });
//
// app.post('/project/fetch/byId/', (req, res) => {
//
// 	const { id } = req.body;
//
// 	dbConnection.select('*').from('projects_services').where('id', id).then( data => {
// 		return data;
// 	}).then( data => {
// 			res.json(data[0]);
// 		}
// 	)
// 	//res.sendStatus(200).send("not found");
// });
//
// 	//// CLIENT SEARCH //////
//
// app.post('/project-search/fetch', (req, res) => {
//
// 	const { search, tipo } = req.body;
//
// 	console.log(tipo)
//
// 	dbConnection.select('*').from('projects_services')
// 	.where('nome_projeto', 'like', '%'+search+'%')
// 	.orWhere('status', 'like', ''+search+'%')
// 	.where('tipo','1')
// 	.then( data => {
// 		return data;
// 	}).then( data => { res.json(data); })
// 	//res.sendStatus(200).send("not found");
// })
//
// 	/// PROJECT DELETE ///
//
// app.delete('/project/delete/', (req, res) => {
//
// 	const { id } = req.body;
//
// 	dbConnection.select('*').from('projects_services').where('id', id).delete().then( response => {
// 		res.send(JSON.stringify(response));
// 	})
// });
//
// 	//// PROJECT FOLLOW ////
//
// app.post('/project/fetch/byHash/', (req, res) => {
//
// 	const { hash } = req.body;
//
// 	dbConnection.select('*').from('projects_services')
// 	.where('proj_hash', hash).then( data => {
// 		return data;
// 	}).then( data => {
// 			if( data != ""){
// 				//console.log(JSON.stringify(data))
// 				res.json(data[0]);
// 			} else
// 				res.send(false)
// 		}
// 	)
// 	//res.sendStatus(200).send("not found");
// });
//
// app.post('/project-search/fetch/ByName', (req, res) => {
//
// 	const { search } = req.body;
//
// 	dbConnection.select('id', 'nome_projeto').from('projects_services')
// 	.where('nome_projeto', 'like', '%'+search+'%')
// 	.limit(10)
// 	.then( data => {
// 		console.log(data)
// 		return data;
// 	}).then( data => {
// 			res.json(data);
// 		}
// 	)
// 	//res.sendStatus(200).send("not found");
// });
//
// app.get('/graphic-receipt/fetch/', (req, res) => {
//
// 	const { expense } = req.query;
//
// 	dbConnection.select('*').from('projects_services').where('status', '!=', 'FINALIZADO').then( data => {
//
// 		//console.log(JSON.stringify(data))
// 		const resObj = []
// 		const values = all( data, async (projeto) => {
//
// 			const query = 'SELECT SUM(valor), projeto_nome from recebimentos WHERE YEAR(data_pag) = "2019" AND projeto_nome = "'+projeto.nome_projeto+'"';
//
// 			await dbConnection.raw(query)
// 				.then( response => {
//
// 					if( response[0][0].projeto_nome != null ){
// 						var rtn = response[0][0]['SUM(valor)'].toFixed(2)
// 						//console.log(JSON.stringify(response[0][0].projeto_nome))
// 						return rtn;
// 					}
//
// 					//console.log(JSON.stringify(response[0][0]))
// 				})
// 				.then(response => {
// 					if( response !== undefined && response != 'undefined'){
// 						rtn = "{project_name : "+projeto.nome+", value: "+response+"}"
// 						resObj.push({project_name : projeto.nome_projeto, val: response})
// 						//console.log(resObj)
// 						return resObj
// 					}
// 				})
//
// 		}).then(function(){
// 				//console.log(resObj)
// 				res.send(resObj)
// 			})
//
// 	});
// })
//
//
// app.get('/graphic-projects-status/fetch/', (req, res) => {
//
// 	const status = ["Não Iniciado", "Iniciado", "Em Processo", "Cancelado", "Encerrado"];
// 	const resObj = []
//
// 	const values = all( status, async (state) => {
// 		await dbConnection.select('*').from('projects_services').where('status', state).count('id as COUNT')
// 		.then( response => {
//
// 			if( response[0].COUNT !== null ){
// 				//console.log(response[0].COUNT)
// 				var rtn = JSON.stringify(response[0].COUNT)
// 				return rtn;
// 			}
//
// 		})
// 		.then(response => {
// 			if( response !== undefined && response != 'undefined'){
// 				resObj.push({status : state, num: response})
// 				return resObj
// 				//console.log(resObj)
// 			}
// 		})
//
// 	}).then(function(){
// 				//console.log(resObj)
// 				res.send(resObj)
// 			//res.json(data)
// 			})
//
// })
// 		/////////// SELECT CASH VALUES ///////////
//
// app.get('/cash/fetch/', (req, res) => {
//
// 	dbConnection.select('*').from('caixa').then( data => {
// 		return data;
// 	}).then( data => {
// 			res.send(data[0])
// 		})
//
// 	.catch(err => res.sendStatus(404).json(err))
// });
//
// app.get('/cashier-report/register', (req, res) => {
//
// 	dbConnection.select('*').from('caixa').then( data => { return data; })
// 	.then( data => {
// 		const d = new Date();
// 		//res.send(data[0])
// 		//console.log(data[0])
// 		const capital 	= data[0].totalCapital;
// 		const pags 		= data[0].pagamentos;
// 		const rebs 		= data[0].totalCapital;
// 		const numPags 	= data[0].numPags;
// 		const numRcbs 	= data[0].numRcbs;
//
// 		//console.log(capital, pags, rebs, numPags, numRcbs)
//
// 		dbConnection('cashier_report')
// 		.returning('*')
// 		.insert({
// 			month: new Date(),
// 			capital: capital,
// 			payments: pags,
// 			numPayments: numPags,
// 			receipt: rebs,
// 			numReceipt: numRcbs,
// 		}).then( response => {
// 			console.log(response)
// 			res.send('Success')
// 		})
// 		.catch(err => res.json(err))
// 		/*const query = 'SELECT SUM(valor), despesa from pagamentos WHERE YEAR(data_pag) = "2019" AND despesa = "'+despesa.nome+'"';
// 		await dbConnection.raw(query).count('id as COUNT')*/
// 	})
// 	.catch(err => res.sendStatus(404).json(err))
// });
//
// app.get('/cashier-report/fetch', (req, res) => {
//
// 	dbConnection.select('*').from('cashier_report').then( data => { return data; })
// 	.then( data => {
// 		const d = new Date();
// 		res.send(data)
// 	})
// 	.catch(err => res.sendStatus(404).json(err))
// });
//
// app.put('/update-cashier', (req, res) => {
// 	//console.log(req.body);
// 	const { id, name, email, password, funcao, permissao } = req.body;
//
// 	dbConnection('caixa')
// 	.returning('recebimentos')
// 	.update({
// 		recebimentos : valor
// 	}).where('id', id)
// 	.then( user => {
// 		res.sendStatus(200).res.send("Success");
// 	})
// 	//.catch(err => res.sendStatus(404).send("Bad Request"))
// 	.catch(err => res.sendStatus(404).json(err))
//
// });
//
// app.post('/register-receipt/', (req, res) => {
//
// 	const { projeto_nome, pagante, data_pag, valor, formaPg } = req.body;
//
// 	dbConnection('recebimentos')
// 	.returning('*')
// 	.insert({
// 		projeto_nome: projeto_nome,
// 		pagante: pagante,
// 		data_pag: data_pag,
// 		valor: valor,
// 		formaPg: formaPg,
// 	}).then( payment => {
//
// 		dbConnection.select('*').from('caixa').then( data => {
// 			//console.log('recebimentos Caixa : ', JSON.stringify(data[0].recebimentos));
// 			const tCapital 			= data[0].totalCapital;
// 			const vlrrecebimentos 	= data[0].recebimentos;
// 			const numRcbs 			= data[0].numRcbs;
//
// 			const newCapital 		= parseFloat(tCapital) + parseFloat(valor);
// 			const trecebimentos 	= parseFloat(vlrrecebimentos) + parseFloat(valor);
// 			const newNumRecbs 		= parseFloat(numRcbs) + parseFloat(1);
//
// 			//console.log('Valor Final : ', JSON.stringify(trecebimentos));
// 				dbConnection('caixa')
// 				.returning('*')
// 				.update({
// 					totalCapital : newCapital.toFixed(2),
// 					recebimentos : trecebimentos.toFixed(2),
// 					numRcbs 	 : newNumRecbs
// 				}).then( res => console.log("UPDATE RETURN == ",res))
// 			})
// 		.catch(err => res.json(err))
//
// 		return payment;
// 	})
// 	.then( user => {
// 		res.json(payment);
// 	})
// 	//.catch(err => res.sendStatus(404).send("Bad Request"))
// 	.catch(err => res.json(err))
// });
//
// app.post('/register-payment/', (req, res) => {
//
// 	const { despesa, pagante, data_pag, valor, formaPg } = req.body;
//
// 	dbConnection('pagamentos')
// 	.returning('*')
// 	.insert({
// 		despesa: despesa,
// 		pagante: pagante,
// 		data_pag: data_pag,
// 		valor: valor,
// 		formaPg: formaPg,
// 	}).then( payment => {
//
// 		dbConnection.select('*').from('caixa').then( data => {
// 			console.log('Pagos Caixa : ', JSON.stringify(data[0].pagamentos));
// 			const tCapital 		= data[0].totalCapital;
// 			const vlrPagos 		= data[0].pagamentos;
// 			const numPags 		= data[0].numPags;
//
// 			const newCapital 	= parseFloat(tCapital) - parseFloat(valor);
// 			const tPagos 		= parseFloat(vlrPagos) + parseFloat(valor);
// 			const newNumPags 	= parseFloat(numPags) + parseFloat(1);
//
// 			console.log('Valor Final : ', JSON.stringify(tPagos), 'New Capital', newCapital);
// 				dbConnection('caixa')
// 				.returning('*')
// 				.update({
// 					totalCapital : newCapital.toFixed(2),
// 					pagamentos 	 : tPagos.toFixed(2),
// 					numPags 	 : newNumPags
// 				}).then( res => console.log("UPDATE RETURN == ",res))
// 			})
// 		.catch(err => res.json(err))
//
// 		return payment;
// 	})
// 	.then( user => {
// 		res.json(payment);
// 	})
// 	.catch(err => res.json(err))
//
// });
//
// app.get('/payments/fetchByExpense/', (req, res) => {
//
// 	const { expense } = req.query;
//
// 	dbConnection.select('*').from('despesas').then( data => {
//
// 		const resObj = []
// 		const values = all( data, async (despesa) => {
//
// 			//Object.assign({despesa.nome}, resObj);
// 				const query = 'SELECT SUM(valor), despesa from pagamentos WHERE YEAR(data_pag) = "2019" AND despesa = "'+despesa.nome+'"';
//
// 				await dbConnection.raw(query)
// 				.then( response => {
//
// 					if( response[0][0].despesa !== null){
// 						var rtn = JSON.stringify(response[0][0]['SUM(valor)'])
// 						return rtn;
// 					}
//
// 				})
// 				.then(response => {
// 					if( response !== undefined && response != 'undefined'){
// 						resObj.push({expName : despesa.nome, expValue: response})
// 						return resObj
// 						//console.log(resObj)
// 					}
// 				})
// 			}).then(function(){
// 				//console.log(resObj)
// 				res.send(resObj)
// 			})
// 	})
//
// });
//
// 	///// PROJECT COUNT ///////
// app.get('/payment/count/', (req, res) => {
// 	//console.log(req.query.user);
// 	//console.log(req.header);
// 	//console.log(req.params);
// 	dbConnection.select('id').from('pagamentos').count('id as COUNT').then( function(total) {
// 		res.send(JSON.stringify(total[0].COUNT))
// 	})
// });

/*app.put('/user/update', (req, res) => {
	//console.log(req.body);
	const user = {
		name: "Salvador",
		hobby: "Reading"
	}

	res.send("Sucess");
});

app.delete('/user/delete', (req, res) => {
	//console.log(req.body);
	const user = {
		name: "Salvador",
		hobby: "Reading"
	}

	res.send("Sucess");
});

const http =  require('http');

const server = http.createServer((request, response) =>{
	const user = {
		name: "Salvador",
		hobby: "Reading"
	}
	response.setHeader('Content-Type', 'application/json');
	response.end(JSON.stringify(user));
})

server.listen(3000);*/
