import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

async function testOCRComplete() {
    console.log('=== TEST OCR COMPLET ===');
    
    // Test 1: Vérifier que l'image existe
    if (!fs.existsSync('test-image.png')) {
        console.log('❌ Test 1 ÉCHEC: Image test non trouvée');
        return;
    }
    console.log('✅ Test 1 RÉUSSI: Image test trouvée');

    // Test 2: Tester l'API OCR.space directement
    try {
        
        const form = new FormData();
        form.append('apikey', 'K83790365588957');
        form.append('file', fs.createReadStream('test-image.png'));
        form.append('language', 'fre');
        form.append('OCREngine', '2');
        
        console.log('🔄 Test 2: Test API OCR.space...');
        const response = await fetch('https://api.ocr.space/parse/image', {
            method: 'POST',
            body: form
        });
        
        const data = await response.json();
        
        if (data.OCRExitCode === 1 && data.ParsedResults && data.ParsedResults[0]) {
            const extractedText = data.ParsedResults[0].ParsedText;
            console.log('✅ Test 2 RÉUSSI: OCR.space fonctionne');
            console.log('📄 Texte extrait:', extractedText.substring(0, 100) + '...');
        } else {
            console.log('❌ Test 2 ÉCHEC: OCR.space ne fonctionne pas');
            console.log('Response:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.log('❌ Test 2 ÉCHEC: Erreur API OCR.space:', error.message);
    }

    // Test 3: Tester l'endpoint de l'application
    try {
        console.log('🔄 Test 3: Test endpoint application...');
        
        // Simuler un appel depuis le frontend
        const imageBuffer = fs.readFileSync('test-image.png');
        const base64Image = imageBuffer.toString('base64');
        
        const response = await fetch('http://localhost:5000/api/extract-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: `data:image/png;base64,${base64Image}`,
                language: 'french'
            })
        });
        
        const result = await response.json();
        
        if (result.success && result.text) {
            console.log('✅ Test 3 RÉUSSI: Endpoint application fonctionne');
            console.log('📄 Texte extrait:', result.text.substring(0, 100) + '...');
        } else {
            console.log('❌ Test 3 ÉCHEC: Endpoint application ne fonctionne pas');
            console.log('Response:', JSON.stringify(result, null, 2));
        }
    } catch (error) {
        console.log('❌ Test 3 ÉCHEC: Erreur endpoint application:', error.message);
    }
}

testOCRComplete().catch(console.error);