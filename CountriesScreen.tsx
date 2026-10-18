import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ScrollView,
  Button,
  TextInput,
} from 'react-native';

const FULL_COUNTRIES_LIST = [
  // Східна та Центральна Європа
  {
    cca3: 'UKR',
    name: { common: 'Україна', official: 'Україна' },
    capital: ['Київ'],
    region: 'Європа',
    subregion: 'Східна Європа',
    population: 41000000,
    languages: { ukr: 'Українська' },
    currencies: { UAH: { name: 'Українська гривня', symbol: '₴' } },
    flags: { png: 'https://flagcdn.com/w320/ua.png' },
  },
  {
    cca3: 'POL',
    name: { common: 'Польща', official: 'Республіка Польща' },
    capital: ['Варшава'],
    region: 'Європа',
    subregion: 'Центральна Європа',
    population: 37950000,
    languages: { pol: 'Польська' },
    currencies: { PLN: { name: 'Польський злотий', symbol: 'zł' } },
    flags: { png: 'https://flagcdn.com/w320/pl.png' },
  },
  {
    cca3: 'CZE',
    name: { common: 'Чехія', official: 'Чеська Республіка' },
    capital: ['Прага'],
    region: 'Європа',
    subregion: 'Центральна Європа',
    population: 10700000,
    languages: { ces: 'Чеська' },
    currencies: { CZK: { name: 'Чеська крона', symbol: 'Kč' } },
    flags: { png: 'https://flagcdn.com/w320/cz.png' },
  },
  {
    cca3: 'ROU',
    name: { common: 'Румунія', official: 'Румунія' },
    capital: ['Бухарест'],
    region: 'Європа',
    subregion: 'Східна Європа',
    population: 19120000,
    languages: { ron: 'Румунська' },
    currencies: { RON: { name: 'Румунський лей', symbol: 'lei' } },
    flags: { png: 'https://flagcdn.com/w320/ro.png' },
  },

  // Західна та Північна Європа
  {
    cca3: 'DEU',
    name: { common: 'Німеччина', official: 'Федеративна Республіка Німеччина' },
    capital: ['Берлін'],
    region: 'Європа',
    subregion: 'Західна Європа',
    population: 83200000,
    languages: { deu: 'Німецька' },
    currencies: { EUR: { name: 'Євро', symbol: '€' } },
    flags: { png: 'https://flagcdn.com/w320/de.png' },
  },
  {
    cca3: 'FRA',
    name: { common: 'Франція', official: 'Французька Республіка' },
    capital: ['Париж'],
    region: 'Європа',
    subregion: 'Західна Європа',
    population: 67390000,
    languages: { fra: 'Французька' },
    currencies: { EUR: { name: 'Євро', symbol: '€' } },
    flags: { png: 'https://flagcdn.com/w320/fr.png' },
  },
  {
    cca3: 'GBR',
    name: { common: 'Великобританія', official: 'Сполучене Королівство' },
    capital: ['Лондон'],
    region: 'Європа',
    subregion: 'Північна Європа',
    population: 67220000,
    languages: { eng: 'Англійська' },
    currencies: { GBP: { name: 'Фунт стерлінгів', symbol: '£' } },
    flags: { png: 'https://flagcdn.com/w320/gb.png' },
  },
  {
    cca3: 'NLD',
    name: { common: 'Нідерланди', official: 'Королівство Нідерландів' },
    capital: ['Амстердам'],
    region: 'Європа',
    subregion: 'Західна Європа',
    population: 17440000,
    languages: { nld: 'Нідерландська' },
    currencies: { EUR: { name: 'Євро', symbol: '€' } },
    flags: { png: 'https://flagcdn.com/w320/nl.png' },
  },
  {
    cca3: 'CHE',
    name: { common: 'Швейцарія', official: 'Швейцарська Конфедерація' },
    capital: ['Берн'],
    region: 'Європа',
    subregion: 'Західна Європа',
    population: 8630000,
    languages: { deu: 'Німецька', fra: 'Французька', ita: 'Італійська' },
    currencies: { CHF: { name: 'Швейцарський франк', symbol: 'CHF' } },
    flags: { png: 'https://flagcdn.com/w320/ch.png' },
  },
  {
    cca3: 'SWE',
    name: { common: 'Швеція', official: 'Королівство Швеція' },
    capital: ['Стокгольм'],
    region: 'Європа',
    subregion: 'Північна Європа',
    population: 10350000,
    languages: { swe: 'Шведська' },
    currencies: { SEK: { name: 'Шведська крона', symbol: 'kr' } },
    flags: { png: 'https://flagcdn.com/w320/se.png' },
  },
  {
    cca3: 'NOR',
    name: { common: 'Норвегія', official: 'Королівство Норвегія' },
    capital: ['Осло'],
    region: 'Європа',
    subregion: 'Північна Європа',
    population: 5379000,
    languages: { nor: 'Норвезька' },
    currencies: { NOK: { name: 'Норвезька крона', symbol: 'kr' } },
    flags: { png: 'https://flagcdn.com/w320/no.png' },
  },

  // Південна Європа
  {
    cca3: 'ITA',
    name: { common: 'Італія', official: 'Італійська Республіка' },
    capital: ['Рим'],
    region: 'Європа',
    subregion: 'Південна Європа',
    population: 59550000,
    languages: { ita: 'Італійська' },
    currencies: { EUR: { name: 'Євро', symbol: '€' } },
    flags: { png: 'https://flagcdn.com/w320/it.png' },
  },
  {
    cca3: 'ESP',
    name: { common: 'Іспанія', official: 'Королівство Іспанія' },
    capital: ['Мадрид'],
    region: 'Європа',
    subregion: 'Південна Європа',
    population: 47350000,
    languages: { spa: 'Іспанська' },
    currencies: { EUR: { name: 'Євро', symbol: '€' } },
    flags: { png: 'https://flagcdn.com/w320/es.png' },
  },
  {
    cca3: 'PRT',
    name: { common: 'Португалія', official: 'Португальська Республіка' },
    capital: ['Лісабон'],
    region: 'Європа',
    subregion: 'Південна Європа',
    population: 10300000,
    languages: { por: 'Португальська' },
    currencies: { EUR: { name: 'Євро', symbol: '€' } },
    flags: { png: 'https://flagcdn.com/w320/pt.png' },
  },
  {
    cca3: 'GRC',
    name: { common: 'Греція', official: 'Грецька Республіка' },
    capital: ['Афіни'],
    region: 'Європа',
    subregion: 'Південна Європа',
    population: 10720000,
    languages: { ell: 'Грецька' },
    currencies: { EUR: { name: 'Євро', symbol: '€' } },
    flags: { png: 'https://flagcdn.com/w320/gr.png' },
  },

  // Північна та Південна Америка
  {
    cca3: 'USA',
    name: { common: 'США', official: 'Сполучені Штати Америки' },
    capital: ['Вашингтон'],
    region: 'Америка',
    subregion: 'Північна Америка',
    population: 331000000,
    languages: { eng: 'Англійська' },
    currencies: { USD: { name: 'Долар США', symbol: '$' } },
    flags: { png: 'https://flagcdn.com/w320/us.png' },
  },
  {
    cca3: 'CAN',
    name: { common: 'Канада', official: 'Канада' },
    capital: ['Оттава'],
    region: 'Америка',
    subregion: 'Північна Америка',
    population: 38000000,
    languages: { eng: 'Англійська', fra: 'Французька' },
    currencies: { CAD: { name: 'Канадський долар', symbol: '$' } },
    flags: { png: 'https://flagcdn.com/w320/ca.png' },
  },
  {
    cca3: 'MEX',
    name: { common: 'Мексика', official: 'Мексиканські Сполучені Штати' },
    capital: ['Мехіко'],
    region: 'Америка',
    subregion: 'Північна Америка',
    population: 128900000,
    languages: { spa: 'Іспанська' },
    currencies: { MXN: { name: 'Мексиканське песо', symbol: '$' } },
    flags: { png: 'https://flagcdn.com/w320/mx.png' },
  },
  {
    cca3: 'BRA',
    name: { common: 'Бразилія', official: 'Федеративна Республіка Бразилія' },
    capital: ['Бразиліа'],
    region: 'Америка',
    subregion: 'Південна Америка',
    population: 212500000,
    languages: { por: 'Португальська' },
    currencies: { BRL: { name: 'Бразильський реал', symbol: 'R$' } },
    flags: { png: 'https://flagcdn.com/w320/br.png' },
  },
  {
    cca3: 'ARG',
    name: { common: 'Аргентина', official: 'Аргентинська Республіка' },
    capital: ['Буенос-Айрес'],
    region: 'Америка',
    subregion: 'Південна Америка',
    population: 45380000,
    languages: { spa: 'Іспанська' },
    currencies: { ARS: { name: 'Аргентинське песо', symbol: '$' } },
    flags: { png: 'https://flagcdn.com/w320/ar.png' },
  },

  // Азія та Близький Схід
  {
    cca3: 'JPN',
    name: { common: 'Японія', official: 'Японія' },
    capital: ['Токіо'],
    region: 'Азія',
    subregion: 'Східна Азія',
    population: 125800000,
    languages: { jpn: 'Японська' },
    currencies: { JPY: { name: 'Японська єна', symbol: '¥' } },
    flags: { png: 'https://flagcdn.com/w320/jp.png' },
  },
  {
    cca3: 'KOR',
    name: { common: 'Південна Корея', official: 'Республіка Корея' },
    capital: ['Сеул'],
    region: 'Азія',
    subregion: 'Східна Азія',
    population: 51780000,
    languages: { kor: 'Корейська' },
    currencies: { KRW: { name: 'Південнокорейська вона', symbol: '₩' } },
    flags: { png: 'https://flagcdn.com/w320/kr.png' },
  },
  {
    cca3: 'CHN',
    name: { common: 'Китай', official: 'Китайська Народна Республіка' },
    capital: ['Пекін'],
    region: 'Азія',
    subregion: 'Східна Азія',
    population: 1411000000,
    languages: { zho: 'Китайська' },
    currencies: { CNY: { name: 'Китайський юань', symbol: '¥' } },
    flags: { png: 'https://flagcdn.com/w320/cn.png' },
  },
  {
    cca3: 'IND',
    name: { common: 'Індія', official: 'Республіка Індія' },
    capital: ['Нью-Делі'],
    region: 'Азія',
    subregion: 'Південна Азія',
    population: 1380000000,
    languages: { hin: 'Хінді', eng: 'Англійська' },
    currencies: { INR: { name: 'Індійська рупія', symbol: '₹' } },
    flags: { png: 'https://flagcdn.com/w320/in.png' },
  },
  {
    cca3: 'TUR',
    name: { common: 'Туреччина', official: 'Турецька Республіка' },
    capital: ['Анкара'],
    region: 'Азія',
    subregion: 'Західна Азія',
    population: 84330000,
    languages: { tur: 'Турецька' },
    currencies: { TRY: { name: 'Турецька ліра', symbol: '₺' } },
    flags: { png: 'https://flagcdn.com/w320/tr.png' },
  },
  {
    cca3: 'ARE',
    name: { common: 'ОАЕ', official: 'Об’єднані Арабські Емірати' },
    capital: ['Абу-Дабі'],
    region: 'Азія',
    subregion: 'Західна Азія',
    population: 9890000,
    languages: { ara: 'Арабська' },
    currencies: { AED: { name: 'Дирхам ОАЕ', symbol: 'د.إ' } },
    flags: { png: 'https://flagcdn.com/w320/ae.png' },
  },
  {
    cca3: 'ISR',
    name: { common: 'Ізраїль', official: 'Держава Ізраїль' },
    capital: ['Єрусалим'],
    region: 'Азія',
    subregion: 'Західна Азія',
    population: 9210000,
    languages: { heb: 'Іврит' },
    currencies: { ILS: { name: 'Новий ізраїльський шекель', symbol: '₪' } },
    flags: { png: 'https://flagcdn.com/w320/il.png' },
  },
  {
    cca3: 'SGP',
    name: { common: 'Сінгапур', official: 'Республіка Сінгапур' },
    capital: ['Сінгапур'],
    region: 'Азія',
    subregion: 'Південно-Східна Азія',
    population: 5686000,
    languages: { eng: 'Англійська', msa: 'Малайська' },
    currencies: { SGD: { name: 'Сінгапурський долар', symbol: '$' } },
    flags: { png: 'https://flagcdn.com/w320/sg.png' },
  },

  // Африка та Океанія
  {
    cca3: 'EGY',
    name: { common: 'Єгипет', official: 'Арабська Республіка Єгипет' },
    capital: ['Каїр'],
    region: 'Африка',
    subregion: 'Північна Африка',
    population: 102300000,
    languages: { ara: 'Арабська' },
    currencies: { EGP: { name: 'Єгипетський фунт', symbol: 'E£' } },
    flags: { png: 'https://flagcdn.com/w320/eg.png' },
  },
  {
    cca3: 'ZAF',
    name: { common: 'ПАР', official: 'Південно-Африканська Республіка' },
    capital: ['Преторія'],
    region: 'Африка',
    subregion: 'Південна Африка',
    population: 59300000,
    languages: { eng: 'Англійська', afr: 'Африкаанс' },
    currencies: { ZAR: { name: 'Південноафриканський ранд', symbol: 'R' } },
    flags: { png: 'https://flagcdn.com/w320/za.png' },
  },
  {
    cca3: 'AUS',
    name: { common: 'Австралія', official: 'Австралійський Союз' },
    capital: ['Канберра'],
    region: 'Океанія',
    subregion: 'Австралія та Нова Зеландія',
    population: 25690000,
    languages: { eng: 'Англійська' },
    currencies: { AUD: { name: 'Австралійський долар', symbol: '$' } },
    flags: { png: 'https://flagcdn.com/w320/au.png' },
  },
  {
    cca3: 'NZL',
    name: { common: 'Нова Зеландія', official: 'Нова Зеландія' },
    capital: ['Веллінгтон'],
    region: 'Океанія',
    subregion: 'Австралія та Нова Зеландія',
    population: 5084000,
    languages: { eng: 'Англійська', mri: 'Маорі' },
    currencies: { NZD: { name: 'Новозеландський долар', symbol: '$' } },
    flags: { png: 'https://flagcdn.com/w320/nz.png' },
  },
];

export const CountriesScreen = ({ isDarkMode }: any) => {
  const [countries, setCountries] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,subregion,languages,currencies,cca3');
      if (!response.ok) throw new Error('Помилка API');
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setCountries(data.slice(0, 60));
      } else {
        throw new Error('Порожні дані');
      }
    } catch (e) {
      setCountries(FULL_COUNTRIES_LIST);
    } finally {
      setLoading(false);
    }
  };

  const filteredCountries = countries.filter((country) => {
    const name = country.name?.common?.toLowerCase() || '';
    const capital = (country.capital && country.capital[0]) ? country.capital[0].toLowerCase() : '';
    const query = searchQuery.toLowerCase().trim();
    return name.includes(query) || capital.includes(query);
  });

  const bgColor = isDarkMode ? '#121212' : '#ffffff';
  const cardBg = isDarkMode ? '#1e1e1e' : '#f5f5f5';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const subTextColor = isDarkMode ? '#cccccc' : '#666666';
  const inputBg = isDarkMode ? '#2a2a2a' : '#f0f0f0';

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: bgColor }]}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={{ color: textColor, marginTop: 12, fontSize: 16 }}>
          Завантаження країн...
        </Text>
      </View>
    );
  }

  const getLanguages = (languages: any) => {
    if (!languages) return 'Н/Д';
    return Object.values(languages).join(', ');
  };

  const getCurrencies = (currencies: any) => {
    if (!currencies) return 'Н/Д';
    return Object.values(currencies)
      .map((c: any) => `${c.name || ''} (${c.symbol || ''})`)
      .join(', ');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="🔍 Пошук країни або столиці..."
          placeholderTextColor={subTextColor}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={[styles.searchInput, { backgroundColor: inputBg, color: textColor }]}
        />
      </View>

      <FlatList
        data={filteredCountries}
        keyExtractor={(item, index) => item.cca3 || index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.card, { backgroundColor: cardBg }]}
            onPress={() => setSelectedCountry(item)}
          >
            {item.flags?.png ? (
              <Image source={{ uri: item.flags.png }} style={styles.flag} />
            ) : (
              <View style={[styles.flag, { backgroundColor: '#ccc' }]} />
            )}
            <View style={styles.info}>
              <Text style={[styles.countryName, { color: textColor }]}>
                {item.name?.common || 'Країна'}
              </Text>
              <Text style={{ color: subTextColor }}>
                🏛 Столиця: {item.capital && item.capital.length > 0 ? item.capital[0] : 'Н/Д'}
              </Text>
              <Text style={{ color: subTextColor }}>🌍 Регіон: {item.region || 'Н/Д'}</Text>
            </View>
            <Text style={{ fontSize: 18, color: subTextColor }}>➔</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: subTextColor }]}>
            Країну за запитом "{searchQuery}" не знайдено
          </Text>
        }
      />

      <Modal
        visible={selectedCountry !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedCountry(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff' }]}>
            {selectedCountry && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {selectedCountry.flags?.png && (
                  <Image
                    source={{ uri: selectedCountry.flags.png }}
                    style={styles.modalFlag}
                  />
                )}
                <Text style={[styles.modalTitle, { color: textColor }]}>
                  {selectedCountry.name?.official || selectedCountry.name?.common}
                </Text>

                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: textColor }]}>🏛 Столиця:</Text>
                  <Text style={[styles.detailValue, { color: subTextColor }]}>
                    {selectedCountry.capital && selectedCountry.capital.length > 0
                      ? selectedCountry.capital[0]
                      : 'Н/Д'}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: textColor }]}>🌍 Регіон / Субрегіон:</Text>
                  <Text style={[styles.detailValue, { color: subTextColor }]}>
                    {selectedCountry.region || 'Н/Д'} ({selectedCountry.subregion || 'Н/Д'})
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: textColor }]}>👥 Населення:</Text>
                  <Text style={[styles.detailValue, { color: subTextColor }]}>
                    {selectedCountry.population
                      ? selectedCountry.population.toLocaleString() + ' осіб'
                      : 'Н/Д'}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: textColor }]}>🗣 Мови:</Text>
                  <Text style={[styles.detailValue, { color: subTextColor }]}>
                    {getLanguages(selectedCountry.languages)}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: textColor }]}>💰 Валюта:</Text>
                  <Text style={[styles.detailValue, { color: subTextColor }]}>
                    {getCurrencies(selectedCountry.currencies)}
                  </Text>
                </View>

                <View style={{ marginTop: 20 }}>
                  <Button
                    title="Закрити"
                    color="#2196F3"
                    onPress={() => setSelectedCountry(null)}
                  />
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  searchContainer: { marginBottom: 12 },
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 15,
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  flag: { width: 60, height: 40, borderRadius: 4, marginRight: 12 },
  info: { flex: 1 },
  countryName: { fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  emptyText: { textAlign: 'center', marginTop: 30, fontSize: 15 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },
  modalFlag: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailRow: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 15,
    marginTop: 2,
  },
});