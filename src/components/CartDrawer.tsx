import { XIcon, Trash2Icon, MinusIcon, PlusIcon, ShoppingBagIcon, ArrowRightIcon } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        onClick={closeCart}
      />

      <aside className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-h5 font-heading font-semibold text-foreground">Košarica</h2>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-muted transition"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                <ShoppingBagIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-h5 font-heading font-semibold mb-3 text-foreground">
                Vaša košarica je prazna
              </h3>
              <p className="text-body-small text-muted-foreground mb-6 max-w-xs">
                Odkrijte naše izdelke in storitve ter začnite ustvarjati!
              </p>
              <div className="flex flex-col gap-3 w-full max-w-xs">
                <Button 
                  onClick={() => {
                    closeCart();
                    navigate('/products');
                  }}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Izdelki
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </Button>
                <Button 
                  onClick={() => {
                    closeCart();
                    navigate('/services');
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Storitve
                </Button>
              </div>
              <div className="mt-8 text-center">
                <p className="text-caption text-muted-foreground">
                  Trenutno porabljeno: <span className="font-semibold text-foreground">0,00 €</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 border-b border-border pb-4 last:border-b-0">
                  <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center overflow-hidden border border-border">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <ShoppingBagIcon className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-body font-heading font-semibold text-foreground">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 rounded-full hover:bg-destructive/10 hover:text-destructive transition"
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-body-small text-accent font-semibold mb-3">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>

                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <MinusIcon className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center text-body font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <PlusIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-6 space-y-4 bg-muted/30">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-body-small">
                <span className="text-muted-foreground">Vmesni seštevek</span>
                <span className="font-semibold">{totalPrice.toFixed(2)} €</span>
              </div>
              <div className="flex items-center justify-between text-body">
                <span className="font-heading font-semibold">Skupaj</span>
                <span className="text-h5 font-heading font-bold text-accent">{totalPrice.toFixed(2)} €</span>
              </div>
            </div>
            <Button className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold">
              Nadaljuj na naročilo
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
            <p className="text-caption text-center text-muted-foreground">
              Dostava in DDV se izračunata pri zaključku naročila
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
