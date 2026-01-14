import { useState } from 'react'
import { ShoppingCart, Heart, Star, Package, Truck, Phone, Mail, MapPin, Search, X, ChevronRight, User, ShoppingBag, Gift } from 'lucide-react'
import { motion } from 'framer-motion'

function App() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [favorites, setFavorites] = useState([])

  const dresses = [
    {
      id: 1,
      name: 'Платье "Принцесса"',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80',
      category: 'Праздничное',
      sizes: ['2-3', '4-5', '6-7', '8-9'],
      description: 'Нежное праздничное платье с пышной юбкой и блестящими деталями'
    },
    {
      id: 2,
      name: 'Платье "Весна"',
      price: 2800,
      image: 'https://images.unsplash.com/photo-1596900779774-9b9b7e4a0e4d?w=800&q=80',
      category: 'Повседневное',
      sizes: ['2-3', '4-5', '6-7'],
      description: 'Легкое летнее платье с цветочным принтом, идеально для прогулок'
    },
    {
      id: 3,
      name: 'Платье "Балерина"',
      price: 4200,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      category: 'Праздничное',
      sizes: ['4-5', '6-7', '8-9', '10-11'],
      description: 'Элегантное платье для особых случаев с атласной лентой'
    },
    {
      id: 4,
      name: 'Платье "Радуга"',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80',
      category: 'Повседневное',
      sizes: ['2-3', '4-5', '6-7'],
      description: 'Яркое разноцветное платье для активных малышек'
    },
    {
      id: 5,
      name: 'Платье "Снежинка"',
      price: 3800,
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80',
      category: 'Праздничное',
      sizes: ['4-5', '6-7', '8-9'],
      description: 'Белоснежное платье с серебряными украшениями для новогодних праздников'
    },
    {
      id: 6,
      name: 'Платье "Ромашка"',
      price: 2600,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
      category: 'Повседневное',
      sizes: ['2-3', '4-5', '6-7', '8-9'],
      description: 'Милое платье в стиле кантри с вышивкой'
    }
  ]

  const addToCart = (dress) => {
    const exists = cart.find(item => item.id === dress.id)
    if (exists) {
      setCart(cart.map(item => 
        item.id === dress.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...dress, quantity: 1 }])
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-pink-100 shadow-sm">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Gift className="w-8 h-8 text-pink-500" />
            <div>
              <span className="text-2xl font-bold text-gray-900 block">Детские Платья</span>
              <span className="text-xs text-pink-500 font-semibold">Магазин для принцесс</span>
            </div>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#catalog" className="text-gray-600 hover:text-pink-500 transition-colors font-medium">Каталог</a>
            <a href="#about" className="text-gray-600 hover:text-pink-500 transition-colors font-medium">О нас</a>
            <a href="#contact" className="text-gray-600 hover:text-pink-500 transition-colors font-medium">Контакты</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-pink-50 rounded-full transition-colors">
              <Heart className={`w-6 h-6 ${favorites.length > 0 ? 'text-pink-500 fill-pink-500' : 'text-gray-600'}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {favorites.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setShowCart(!showCart)}
              className="relative bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Корзина</span>
              {cart.length > 0 && (
                <span className="bg-white text-pink-500 text-xs px-2 py-1 rounded-full font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* CART SIDEBAR */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={() => setShowCart(false)}>
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Корзина</h2>
              <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Корзина пуста</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-pink-50 p-4 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-pink-500 font-bold">{item.price} ₽</p>
                        <p className="text-sm text-gray-600">Количество: {item.quantity}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg h-fit"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Товаров:</span>
                    <span className="font-semibold">{cart.reduce((sum, item) => sum + item.quantity, 0)} шт.</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-gray-900">Итого:</span>
                    <span className="text-2xl font-bold text-pink-500">{totalPrice} ₽</span>
                  </div>
                  <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-pink-500/30">
                    Оформить заказ
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-80 object-cover rounded-t-2xl" />
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                  <span className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedProduct.category}
                  </span>
                </div>
                <button 
                  onClick={() => toggleFavorite(selectedProduct.id)}
                  className="p-2 hover:bg-pink-50 rounded-full transition-colors"
                >
                  <Heart className={`w-7 h-7 ${favorites.includes(selectedProduct.id) ? 'text-pink-500 fill-pink-500' : 'text-gray-400'}`} />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">{selectedProduct.description}</p>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Доступные размеры:</h3>
                <div className="flex gap-2">
                  {selectedProduct.sizes.map(size => (
                    <button key={size} className="border-2 border-pink-200 hover:border-pink-500 hover:bg-pink-50 px-4 py-2 rounded-lg font-semibold text-gray-700 transition-all">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Цена</p>
                  <p className="text-3xl font-bold text-pink-500">{selectedProduct.price} ₽</p>
                </div>
                <button 
                  onClick={() => {
                    addToCart(selectedProduct)
                    setSelectedProduct(null)
                  }}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-pink-500/30 flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  В корзину
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-50 opacity-50" />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight"
            >
              Платья для <span className="text-pink-500">Маленьких Принцесс</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Качественные и красивые платья для девочек от 2 до 12 лет. Праздничные и повседневные модели с доставкой по всей России
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button 
                onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })}
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2"
              >
                Смотреть каталог
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white hover:bg-gray-50 text-pink-500 px-8 py-4 rounded-full text-lg font-bold transition-all border-2 border-pink-200">
                О нас
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-pink-100 text-center">
              <Package className="w-10 h-10 text-pink-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">500+</h3>
              <p className="text-sm text-gray-600">Моделей</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-pink-100 text-center">
              <Star className="w-10 h-10 text-pink-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">100%</h3>
              <p className="text-sm text-gray-600">Качество</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-pink-100 text-center">
              <Truck className="w-10 h-10 text-pink-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">2-5 дней</h3>
              <p className="text-sm text-gray-600">Доставка</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-pink-100 text-center">
              <Heart className="w-10 h-10 text-pink-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">5000+</h3>
              <p className="text-sm text-gray-600">Клиентов</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Наш <span className="text-pink-500">Каталог</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Выберите идеальное платье для вашей принцессы
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dresses.map((dress, index) => (
              <motion.div
                key={dress.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl overflow-hidden border border-pink-100 hover:border-pink-300 transition-all transform hover:scale-105 hover:shadow-2xl group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={dress.image} 
                    alt={dress.name} 
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button 
                    onClick={() => toggleFavorite(dress.id)}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(dress.id) ? 'text-pink-500 fill-pink-500' : 'text-gray-600'}`} />
                  </button>
                  <span className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {dress.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{dress.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{dress.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-pink-500">{dress.price} ₽</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedProduct(dress)}
                      className="flex-1 bg-white hover:bg-pink-50 text-pink-500 border-2 border-pink-200 px-4 py-3 rounded-xl font-semibold transition-all"
                    >
                      Подробнее
                    </button>
                    <button 
                      onClick={() => addToCart(dress)}
                      className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      В корзину
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-6 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                О <span className="text-pink-500">Нашем Магазине</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Мы специализируемся на продаже качественных детских платьев уже более 10 лет. Наша миссия - делать каждую маленькую принцессу счастливой и красивой.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Все наши платья изготовлены из натуральных тканей, безопасны для детской кожи и соответствуют всем стандартам качества.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl border border-pink-100">
                  <Gift className="w-8 h-8 text-pink-500 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Подарок к заказу</h3>
                  <p className="text-sm text-gray-600">При покупке от 5000₽</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-pink-100">
                  <Truck className="w-8 h-8 text-pink-500 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Быстрая доставка</h3>
                  <p className="text-sm text-gray-600">По всей России</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80" alt="Dress 1" className="rounded-2xl shadow-lg" />
              <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80" alt="Dress 2" className="rounded-2xl shadow-lg mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Свяжитесь <span className="text-pink-500">с Нами</span>
            </h2>
            <p className="text-xl text-gray-600">
              Мы всегда рады помочь вам с выбором
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-pink-50 rounded-2xl border border-pink-100">
              <Phone className="w-10 h-10 text-pink-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Телефон</h3>
              <p className="text-gray-600">+7 (495) 123-45-67</p>
              <p className="text-sm text-gray-500 mt-1">Пн-Вс: 9:00-21:00</p>
            </div>
            <div className="text-center p-6 bg-pink-50 rounded-2xl border border-pink-100">
              <Mail className="w-10 h-10 text-pink-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@dresses.ru</p>
              <p className="text-sm text-gray-500 mt-1">Ответим в течение часа</p>
            </div>
            <div className="text-center p-6 bg-pink-50 rounded-2xl border border-pink-100">
              <MapPin className="w-10 h-10 text-pink-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Адрес</h3>
              <p className="text-gray-600">г. Москва, ул. Примерная, 123</p>
              <p className="text-sm text-gray-500 mt-1">Шоу-рум работает по записи</p>
            </div>
          </div>

          <form className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl border border-pink-100">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input 
                type="text" 
                placeholder="Ваше имя" 
                className="px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 outline-none transition-colors"
              />
              <input 
                type="tel" 
                placeholder="Телефон" 
                className="px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 outline-none transition-colors"
              />
            </div>
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 outline-none transition-colors mb-6"
            />
            <textarea 
              placeholder="Ваше сообщение" 
              rows="4"
              className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 outline-none transition-colors mb-6"
            />
            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-pink-500/30">
              Отправить сообщение
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Gift className="w-6 h-6 text-pink-500" />
                <span className="text-xl font-bold text-white">Детские Платья</span>
              </div>
              <p className="text-gray-400 text-sm">
                Лучшие платья для ваших принцесс с 2014 года
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Каталог</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-pink-500 transition-colors">Праздничные платья</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Повседневные платья</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Новинки</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Распродажа</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Информация</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-pink-500 transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Доставка и оплата</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Возврат товара</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Контакты</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@dresses.ru
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  г. Москва
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © 2024 Детские Платья. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App