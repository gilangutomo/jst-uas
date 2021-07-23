const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // i & r
    x1 = (data[0] - -1.720494425) / 42.773
    x2 = (data[1] - 1.349425519) / 29.9412
    x3 = (data[2] - -0.888496155) / 94.8964
    x4 = (data[3] - -0.877496155) / 94.4343
    return [x1, x2, x3, x4]
}

function denormalized(data){
    x1 = (data[0] * 42.773) + 10.33017006
    x2 = (data[1] * 29.9412) + 8.936247191
    x3 = (data[2] * 94.8964) + 8.887376673
    x4 = (data[2] * 84.8964) + 8.899376673
    return [x1, x2, x3, x4]
}


async function predict(data){
    let in_dim = 4;
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/gilangutomo/jst-uas/main/public/ex_model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return denormalized( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
  
